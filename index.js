var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;


// set up a config
var config = {
  sensitivity : 10,
  loThreshold : 60,
  hiThreshold : 80,
  frequencyNodeCount : 8
};


// express setup
app.use(express.static('public'));
server.listen(port);
console.log('server running on port', port);


// handle socket data
io.on('connection', function(socket){

  // act as a pass through for sound data
  socket.on('stage-left', function(data){
    io.sockets.emit('stage-left', data);
  });
  socket.on('stage-right', function(data){
    io.sockets.emit('stage-right', data);
  });

  // when first connected, always send config
  socket.emit('config-update', config);

  // send config updates to connected clients
  socket.on('config-update', function(data){
    for(var key in data){
      config[key] = data[key];
    }

    io.sockets.emit('config-update', data);
  });
});
