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

//app.use(express.static(__dirname + "/public"));

function getAllClientsForDocumemt(documentUuid) {
    //return clients.filter(client => client )
}

function onConnection(clientSocket) {
    /*if (!clients.includes(clientSocket.Uuid)) {
        clients.push(clientSocket.Uuid);
    }*/

    clientSocket.on("recieveDocumentUuid", (client) => onRecieveDocumentUuid(clientSocket.id, client));

    clientSocket.on("typing", onTyping);

    clientSocket.on("disconnect", () => onDisconnect(clientSocket.id));

}

function onRecieveDocumentUuid(clientSocketId, client) {
    //add clients to their respective document room
    let newClient = {
        "clientSocketId" : clientSocketId,
        "clientUuid" : client.clientUuid
    };

    let containsDocument = false;

    documents.forEach(document => { //refactor
        if (document.documentUuid === client.documentUuid) {
            containsDocument = true;
        }
    });

    console.log(containsDocument);

    if (containsDocument) {
        documents.forEach(document => {
            if (document.documentUuid === client.documentUuid) {
                document.clients.push(newClient);
            }
        });
    } else {
        documents.push({"documentUuid" : client.documentUuid, "clients" : [newClient]});
    }

    documents.forEach(document => {
        console.log(document);
        document.clients.forEach(client => {
            //console.log(client);
        });
    });
    /*if (clients.documentUuid === client.documentUuid) {

    } else {
        clients.push({"documentUuid" : client.documentUuid, "clients" : [newClient]})
    }
    console.log(clientSocketId);
    console.log(client.clientUuid);
    console.log(client.documentUuid);
    */
    //send document
    //socket.broadcast.to(socketid).emit('message', 'for your eyes only');
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
