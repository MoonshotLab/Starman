var soundCapture = new Scream.SC({
  emissionRate : 50
});


Scream.SC.getDevice('Default', function(device){
  soundCapture.listen(device);
});


soundCapture.emitter.addListener('volume', function(volume){
  console.log(volume);
});
