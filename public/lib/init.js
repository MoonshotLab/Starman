// setup a container
var Scream = {
  socket : io()
};


// shims
window.AudioContext = window.AudioContext || window.webkitAudioContext;
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;


// utils
var Utils = {
  config : {},
  random : function(lo, hi) {
    return Math.floor(Math.random() * (1 + hi - lo)) + lo;
  }
};


// listen for configuration updates
Scream.socket.on('config-update', function(data){
  for(var key in data){
    Utils.config[key] = data[key];
  }
});
