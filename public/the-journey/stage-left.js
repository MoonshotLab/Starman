// create a sound capture instance
var soundCapture = new Scream.SC({
  emissionRate : Utils.config.emissionRate
});


// startup the device
Scream.SC.getDevice('AudioBox USB', function(device){
  soundCapture.listen(device);
});


soundCapture.emitter.addListener('volume', function(volume){
  socket.emit('stage-left', volume);
});
