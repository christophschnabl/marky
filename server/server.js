const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;
const routes = require('./routes/routes.js');
const bodyparser = require('body-parser');

let clientCount = 0;

let clients = [];

app.use(bodyparser.urlencoded({
  extended: true
}));

app.use('/', routes);

app.get("/", function(req, res){
  res.sendFile(__dirname + "/client/index.html");
});

//app.use(express.static(__dirname + "/public"));

function onConnection(socket){
  clientCount++;
  console.log("Clients connected: ");
  console.log(clientCount);
  console.log(clients);

  socket.on("sendName", function(name) {
      clients.push(name);
  });

  socket.on("typing", function(data) {
    //console.log("text: " + text);
    io.emit("typing", data);

  });

  socket.on("disconnect", function(){
    clientCount--;
    console.log("Clients connected: ");
    console.log(clientCount);
  });
  //socket.on("type", (data) => socket.broadcast.emit("type", data));
}

io.on("connection", onConnection);

http.listen(port, () => console.log("server listening on port " + port));
