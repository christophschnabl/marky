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


function getAllClientsForRoom(documentUuid) {
    io.of('/').in(client.documentUuid).clients(function(error,clients) {
        if (error) console.error("Room doesn't exist: " + error);

        return clients;
    });
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

function onConnection(clientSocket) {
    clientSocket.on("recieveDocumentUuid", (client) => onRecieveDocumentUuid(clientSocket, client));

    clientSocket.on("saveDocument", (data) => onDocumentSave(clientSocket, data)); //dk yet what data needs to be

    clientSocket.on("typing", (typeData) => onTyping(clientSocket, typeData));

    clientSocket.on("disconnect", () => onDisconnect(clientSocket));
}

function onRecieveDocumentUuid(clientSocket, client) {
    leaveAllButOwnRooms(clientSocket);

    clientSocket.join(client.documentUuid);

    console.log(clientSocket.id + " connected to + " + client.documentUuid);

    const clientsInRoom = getAllClientsForRoom(client.documentUuid);

    let rooms = io.sockets.adapter.rooms;


    //io.to(client.documentUUid).emit("typing", "hansi");

    /*for (let i = 0; i < rooms.length; i++) {
        const room = rooms[i];
        if(!clients.includes(room)) {
            newRooms.push(room);
        } else {
            //.log(room);
        }
    }*/

    /*rooms = rooms.filter(room => {
        if(clients.includes(room)) {
            return false;
        } else {
            return true;
        }
    });*/



    //io.to(client.documentUuid).emit("typing", "hansi");


    //add clients to their respective document room
    /*let newClient = {
        "clientSocketId" : clientSocket.id,
        "clientUuid" : client.clientUuid
    };

    let containsDocument = false;

    documents.forEach(document => { //refactor -> in db nachschauen und gleich inhalt vom dokument mitbekommen
        if (document.document.documentUuid === client.documentUuid) {
            containsDocument = document;
        }
    });

    if (!containsDocument) {
        Document.find({"documentUuid" : client.documentUuid}, (err, document) => {
            if (err) console.error(err);

            if (document.length > 0) {
                containsDocument = true;
            }
        });
    }

    if (containsDocument) {
        documents.forEach(document => {
            if (document.document.documentUuid === client.documentUuid) {
                document.clients.push(newClient);
            }
        });
    } else { //create new Document and save it to db
        const document = new Document({documentUuid : client.documentUuid, content : "", owner : newClient.clientUuid});
        /*document.save((err) => {
            if (err) console.error(err);
        });

        documents.push({"document" : document, "content" : "hansiinitalContent", "clients" : [newClient]});
    }

    //send document content to the newly joined user
    clientSocket.emit("initialDocumentContent", containsDocument.content);
    */
}

function onDocumentSave(clientSocket, data) {
    const document = getDocumentByClientSocketId(clientSocket.id);
    console.log(document);
}

function onDisconnect(clientSocket) {
    const room = getRoomForClient(clientSocket);
    //io.to(room).emit("clientLeft", enterNameHere);
    clientSocket.leave();
}

function onTyping(clientSocket, typeData) {
    const room = getRoomForClient(clientSocket);
    io.to(room).emit('typing', typeData);
}

io.on("connection", onConnection);

http.listen(port, () => console.log("server listening on port " + port));
