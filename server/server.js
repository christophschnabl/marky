const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;
const routes = require('./routes/routes.js');
const bodyparser = require('body-parser');
const mongoose = require("mongoose");
const Document = require("./models/document.js");

//todo auslagern
mongoose.connect("mongodb+srv://s6:cigqec-3xiWse-jecjat@s6-0tzyv.gcp.mongodb.net/marky?retryWrites=true&w=majority",  { useNewUrlParser: true } )
    .then(() =>  console.log("connection successful"))
    .catch((err) => console.error(err))
;

app.use(bodyparser.json());
app.use(express.static("client"));
app.use("/", routes);

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/client/index.html");
});

app.get('/login', function(req, res) {
  res.sendFile(__dirname + "/client/login.html");
});

let roomsWithContents = {};
let clientSocketIdWithClientUuids = [];


function getAllClientsForRoom(documentUuid) {
    io.of('/').in(documentUuid).clients(function(error,clients) {
        if (error) console.error("Room doesn't exist: " + error);

        return clients;
    });
}


function getContentForDocument(documentUuid, callback) {
    console.log(roomsWithContents);
    if(Object.keys(roomsWithContents).includes(documentUuid)) { //documet room already locally saved
        setTimeout(() => {callback(roomsWithContents[documentUuid])}, 0);
    } else { //find in db and save locally
        Document.findOne({"documentUuid" : documentUuid}, (err, document) => {
            if (err) console.error(err);

            if (document !== undefined && document !== null) {
                roomsWithContents[documentUuid] = document.content;
                callback(document.content);
            } else { //document is empty
                //createDocument
                roomsWithContents[documentUuid] = "";
                //save to db? or wait for user to safe document?
                callback("");
            }
        });
    }
}

function leaveAllButOwnRooms(clientSocket) {
    Object.keys(clientSocket.rooms).filter(room => { //foreach doesn't work here -__-
        if (room !== clientSocket.id) {
            clientSocket.leave(room);
            return false;
        } else {
            return true;
        }
    });
}


function getRoomForClient(clientSocket) {
    const rooms = Object.keys(clientSocket.rooms).filter(room => {
        if (room === clientSocket.id) {
            return false;
        } {
            return true;
        }
    });

    return rooms[0];
}


function addToClientList(clientSocketId, clientUuid) {
    clientSocketIdWithClientUuids.push({"clientSocketId" : clientSocketId, "clientUuid" : clientUuid});
}

function removeFromClientList(clientSocketId) {
    clientSocketIdWithClientUuids = clientSocketIdWithClientUuids.filter(client => {
        if (client.clientSocketIt === clientSocketId) {
            return false;
        } else {
            return true;
        }
    });
}

function onConnection(clientSocket) {
    clientSocket.on("recieveDocumentUuid", (client) => onRecieveDocumentUuid(clientSocket, client));

    clientSocket.on("saveDocument", (data) => onDocumentSave(clientSocket, data)); //dk yet what data needs to be

    clientSocket.on("typing", (typeData) => onTyping(clientSocket, typeData));

    clientSocket.on("disconnect", () => onDisconnect(clientSocket));
}

function onRecieveDocumentUuid(clientSocket, client) {
    leaveAllButOwnRooms(clientSocket);
    addToClientList(clientSocket.id, client.clientUuid);

    // join room for requested document
    clientSocket.join(client.documentUuid);
    console.log(clientSocket.id + " joined + " + client.documentUuid);

    // get inital text for document and send it to the joining client
    getContentForDocument(client.documentUuid, (content) => {
        io.to(client.documentUuid).emit("typing", {"text" : content});
    });
}

function onDocumentSave(clientSocket, data) {
    const document = getDocumentByClientSocketId(clientSocket.id);
    console.log(document);
    //save oder update?
}

function onDisconnect(clientSocket) {
    const room = getRoomForClient(clientSocket);
    //io.to(room).emit("clientLeft", enterNameHere); let othr clients know that client left the document

    clientSocket.leave();
    removeFromClientList(clientSocket.id);
}

function onTyping(clientSocket, typeData) {
    const room = getRoomForClient(clientSocket);

    roomsWithContents[room] = typeData.text;
    console.log(roomsWithContents);


    io.to(room).emit('typing', typeData);
}

io.on("connection", onConnection);

http.listen(port, () => console.log("server listening on port " + port));
