const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

function onConnection(socket){
  socket.on('type', (data) => socket.broadcast.emit('type', data));
}

io.on('connection', onConnection);

http.listen(port, () => console.log('server listening on port ' + port));
