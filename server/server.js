const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;
const routes = require('./routes/routes.js');
const bodyparser = require('body-parser');

// documents : [{"documentUUid" : [{"clientUuid", "clientSocketId"}]}]
// clients = []

let documents = [];

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

function onConnection(clientSocket) {
    /*if (!clients.includes(clientSocket.Uuid)) {
        clients.push(clientSocket.Uuid);
    }*/

    clientSocket.on("recieveDocumentUuid", (client) => onRecieveDocumentUuid(clientSocket, client));

    clientSocket.on("typing", onTyping);

    clientSocket.on("disconnect", () => onDisconnect(clientSocket.id));

}

function onRecieveDocumentUuid(clientSocket, client) {
    //add clients to their respective document room
    let newClient = {
        "clientSocketId" : clientSocket.id,
        "clientUuid" : client.clientUuid
    };

    let containsDocument = false;

    documents.forEach(document => { //refactor -> in db nachschauen und gleich inhalt vom dokument mitbekommen
        if (document.documentUuid === client.documentUuid) {
            containsDocument = document;
        }
    });

    if (containsDocument) {
        documents.forEach(document => {
            if (document.documentUuid === client.documentUuid) {
                document.clients.push(newClient);
            }
        });
    } else {
        //dokument in db erstellen!
        documents.push({"documentUuid" : client.documentUuid, "content" : "hansiinitalContent", "clients" : [newClient]});
    }

    //send document content to the newly joined user
    clientSocket.emit("initialDocumentContent", containsDocument.content);
}

function onDisconnect(clientSocketId) {
    /*clients = clients.filter(client => client !== clientSocketId);
    console.log(clients);*/
}

function onTyping(typeData) {
    io.emit("typing", typeData);
}

function onSendName(clientUuid) {
    clients.push(clientUuid);
}

io.on("connection", onConnection);

http.listen(port, () => console.log("server listening on port " + port));
