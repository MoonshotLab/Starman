var config = {
  maxVolume : 10,
  loThreshold : 60,
  hiThreshold : 80,
  emissionRate : 50
};


// reference some dom elements
var $ = {
  volume : document.getElementById('volume'),
  power  : document.getElementById('power')
};


// create a sound capture instance
var soundCapture = new Scream.SC({
  emissionRate : config.emissionRate
});


// startup the device
Scream.SC.getDevice('Default', function(device){
  soundCapture.listen(device);
});


// listen for volume changes and react
var powerLevel = 0;
soundCapture.emitter.addListener('volume', function(volume){
  var volumeLevel = volume/config.maxVolume;

  if(volumeLevel < config.hiThreshold && volumeLevel > config.loThreshold){
    powerLevel++;
  } else {
    powerLevel--;
    if(powerLevel <= 0) powerLevel = 0;
  }

  $.volume.style.height = volumeLevel + '%';
  $.power.style.height = powerLevel + '%';

  if(powerLevel >= 100){
    alert('BLAST OFF!');
  }
});
