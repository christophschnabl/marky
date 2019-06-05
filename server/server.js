const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;

let clients = [];

app.get("/document/uuid:", function(req, res) {
  res.sendFile(__dirname + "/client/index.html");
});

//app.use(express.static(__dirname + "/public"));

function onConnection(clientSocket) {
    if (!clients.includes(clientSocket.id)) {
        clients.push(clientSocket.id);
    }

    clientSocket.on("typing", onTyping);

    clientSocket.on("disconnect", () => onDisconnect(clientSocket.id));

}

function onDisconnect(clientId) {
    clients = clients.filter(client => client !== clientId);
    console.log(clients);
}

function onTyping(typeData) {
    io.emit("typing", typeData);
}

function onSendName(clientUuid) {
    clients.push(clientUuid);
}

io.on("connection", onConnection);

http.listen(port, () => console.log("server listening on port " + port));
