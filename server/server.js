const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;
const routes = require('./routes/routes.js');
const bodyparser = require('body-parser');
const mongoose = require("mongoose");
const cors = require('cors');
const Document = require("./models/document.js");
app.use(cors());
app.options('*', cors());


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

let documentModels = [];
let roomsWithContents = {};
let clientSocketIdWithClientUuids = [];
let clientSocketIdWithRooms = {}; //save clients with respective rooms bc of socket io

function getAllClientsForRoom(documentUuid, callback) {
    io.of('/').in(documentUuid).clients(function(error, clients) {
        if (error) console.error("Room doesn't exist: " + error);

        callback(clients);
    });
}

function getRoomForClientAfterDisconnection(clientSocketId) {
    return clientSocketIdWithRooms[clientSocketId];
}

function addClientToRoomForDisconnection(clientSocketId, room) {
    clientSocketIdWithRooms[clientSocketId] = room;
}

function getContentForDocument(documentUuid, callback) {
    if(Object.keys(roomsWithContents).includes(documentUuid)) { //documet room already locally saved
        setTimeout(() => {callback(roomsWithContents[documentUuid])}, 0);
    } else { //find in db and save locally
        Document.findOne({"documentUuid" : documentUuid}, (err, document) => {
            if (err) console.error(err);

            if (document !== undefined && document !== null) {
                roomsWithContents[documentUuid] = document.content;
                documentModels.push(document);
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

function leaveAllButOwnRoom(clientSocket) {
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


function getNameBySocketId(clientSocketId, callback) {
     clientSocketIdWithClientUuids.filter(client => {
        if (client.clientSocketId === clientSocketId) {
            callback(client.clientUuid);
        }
    });
}

function getDocumentModelForUuid(documentUuid) {
    for (let i = 0; i < documentModels.length; i++) {
        if (documentModels[i].documentUuid === documentUuid) {
            return documentModels[i];
        }
    }
    return undefined;
}

function addToClientList(clientSocketId, clientUuid) {
    clientSocketIdWithClientUuids.push({"clientSocketId" : clientSocketId, "clientUuid" : clientUuid});
}

function removeFromClientList(clientSocketId) {
    clientSocketIdWithClientUuids = clientSocketIdWithClientUuids.filter(client => {
        if (client.clientSocketId === clientSocketId) {
            return false;
        } else {
            return true;
        }
    });
}

function onConnection(clientSocket) {
    clientSocket.on("recieveDocumentUuid", (client) => onRecieveDocumentUuid(clientSocket, client));

    clientSocket.on("saveDocument", (data) => onDocumentSave(clientSocket, data));

    clientSocket.on("typing", (typeData) => onTyping(clientSocket, typeData));

    clientSocket.on("disconnect", () => onDisconnect(clientSocket));
}

function onRecieveDocumentUuid(clientSocket, client) {
    leaveAllButOwnRoom(clientSocket);
    addToClientList(clientSocket.id, client.clientUuid);
    addClientToRoomForDisconnection(clientSocket.id, client.documentUuid);

    // join room for requested document
    clientSocket.join(client.documentUuid);

    // get inital text for document and send it to the joining client
    getContentForDocument(client.documentUuid, (content) => {
        io.to(client.documentUuid).emit("typing", {"text" : content});
    });

    // get all users for this document
    getAllClientsForRoom(client.documentUuid, clients => {
        for (let i = 0; i < clients.length; i++) {
            getNameBySocketId(clients[i], (uuid) =>{
                clientSocket.emit("clientJoined", uuid);
            });
        }
    });


    // let other users know that this client Joined
    console.log("Client: " + client.clientUuid + " joined channel: " + client.documentUuid);
    clientSocket.broadcast.to(client.documentUuid).emit("clientJoined", client.clientUuid);
}

function onDocumentSave(clientSocket, data) {
    //find current document
    const documentUuid = getRoomForClient(clientSocket);

    //find Document model for documentUuid
    let documentModel = getDocumentModelForUuid(documentUuid)

    console.log("Saving: " + documentUuid + " with content: " + data.content + "and name: " + data.name);


    //if model doesnt exist -> create and save new one - TODO create when loading?
    if (documentModel === undefined) {
        documentModel = new Document({documentUuid: documentUuid, content: data.content, name: data.name});

    } else { //save existing model
        documentModel.content = data.content;
        documentModel.name = data.name;
    }

    documentModel.save((err, documet) => {
         if (err) return console.error(err);
         console.log("Successfully saved " + documentModel.name + " with content: " + documentModel.content + " to db");
    });
}

function onDisconnect(clientSocket) { //TODO rooms arent stored anymore here !!!
    //let othr clients know that client left the document
    const room = getRoomForClientAfterDisconnection(clientSocket.id);

     getNameBySocketId(clientSocket.id, (name) => {
         console.log("Client: " + name + " left channel: " + room);

         //let others know that client left
         io.in(room).emit("clientLeft", name);
     });

    //leave from room
    clientSocket.leave();
    removeFromClientList(clientSocket.id);
}

function onTyping(clientSocket, typeData) {
    const room = getRoomForClient(clientSocket);

    roomsWithContents[room] = typeData.text;
    //console.log(roomsWithContents);


    io.to(room).emit('typing', typeData);
}

io.on("connection", onConnection);

http.listen(port, () => console.log("server listening on port " + port));
