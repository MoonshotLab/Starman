var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

// express setup
app.use(express.static('public'));
server.listen(port);
console.log('server running on port', port);

// handle socket data
io.on('connection', function(socket){
  socket.on('stage-left', function(data){
    io.sockets.emit('stage-left', data);
  });
});
