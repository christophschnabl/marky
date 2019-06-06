const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;
const routes = require('./routes/routes.js');
const bodyparser = require('body-parser');
const mongoose = require("mongoose");
const Document = require("./models/document.js");

mongoose.connect("mongodb+srv://s6:cigqec-3xiWse-jecjat@s6-0tzyv.gcp.mongodb.net/marky?retryWrites=true&w=majority",  { useNewUrlParser: true } )
    .then(() =>  console.log("connection successful"))
    .catch((err) => console.error(err))
;

// documents : [{"document" : [{"clientUuid", "clientSocketId"}]}]
// clients = []

let documents = [];
let users = [];

app.use(bodyparser.json());
app.use(express.static("client"));
app.use("/", routes);

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/client/index.html");
});

app.get('/login', function(req, res) {
  res.sendFile(__dirname + "/client/login.html");
});

//app.use(express.static(__dirname + "/public"));

function getAllClientsForDocumemt(documentUuid) {
    //return clients.filter(client => client )
}

function getAllClientsInSameDocument(clientSocketId) {
    for (let i = 0; i < documents.length; i++) {
        for (let j = 0; j < documents[i].clients.length; j++) {
            const client =  documents[i].clients[j];

            if (client.clientSocketId === clientSocketId) {
                return documents[i].clients;
            }
        }
    }
}

function getDocumentByClientSocketId(clientSocketId) {
    for (let i = 0; i < documents.length; i++) {
        for (let j = 0; j < documents[i].clients.length; j++) {
            const client =  documents[i].clients[j];

            if (client.clientSocketId === clientSocketId) {
                return documents[i].document;
            }
        }
    }
}

function onConnection(clientSocket) {
    /*if (!clients.includes(clientSocket.Uuid)) {
        clients.push(clientSocket.Uuid);
    }*/

    clientSocket.on("recieveDocumentUuid", (client) => onRecieveDocumentUuid(clientSocket, client));

    /*clientSocket.on("saveDocument", (data) => onDocumentSave(clientSocket.id, data)); //dk yet what data needs to be
    */
    clientSocket.on("typing", (typeData) => onTyping(clientSocket, typeData));

    clientSocket.on("disconnect", () => onDisconnect(clientSocket.id));

}

function onRecieveDocumentUuid(clientSocket, client) {
    clientSocket.join(client.documentUuid);
    console.log(clientSocket.id + " connected to + " + client.documentUuid);
    let clients;

    io.of('/').in(client.documentUuid).clients(function(error,clientList){
        clients = clientList;
    });

    let rooms = io.sockets.adapter.rooms;

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

function onDocumentSave(clientSocketId, data) {
    const document = getDocumentByClientSocketId(clientSocketId);
    console.log(document);
}

function onDisconnect(clientSocketId) {
    /*clients = clients.filter(client => client !== clientSocketId);
    console.log(clients);*/

    //send to other users that current user disconnected from channel
}

function onTyping(clientSocket, typeData) {
    //io.emit("typing", typeData);
    //const clients = getAllClientsInSameDocument(clientSocketId);
    let clients;

    let room = "hansi";
    io.to(room).emit('typing', typeData);


    /*io.of('/').in(clientSocket.rooms[0]).clients(function(error,clientList){
        clients = clientList;
    });

    for (let i = 0; i < clients.length; i++) {
        io.to(clients[i].clientSocket.id).emit("typing", typeData);
        console.log(clientSocket.id +  " typed " + typeData);
    }*/

    /*clients.foreach(client => {
        io.broadcast.to(client.clientSocketId).emit('typing', typeDate);
    });*/
}

function onSendName(clientUuid) {
    clients.push(clientUuid);
}

io.on("connection", onConnection);

http.listen(port, () => console.log("server listening on port " + port));
