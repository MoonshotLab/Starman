var config = {
  maxVolume : 10,
  loThreshold : 60,
  hiThreshold : 80,
  emissionRate : 50
};


// reference some dom elements
var $ = {
  volume : document.getElementById('volume'),
  power : document.getElementById('power'),
  targetHi : document.getElementById('target-hi'),
  targetLo : document.getElementById('target-lo')
};
$.targetHi.style.top = (100 - config.hiThreshold) + '%';
$.targetLo.style.top = (100 - config.loThreshold) + '%';

// create a sound capture instance
var soundCapture = new Scream.SC({
  emissionRate : config.emissionRate
});


// startup the device
Scream.SC.getDevice('AudioBox USB', function(device){
  soundCapture.listen(device);
});


// listen for volume changes and react
var powerLevel = 0;
soundCapture.emitter.addListener('volume', function(volume){
  var volumeLevel = (volume/config.maxVolume)*100;
  if(volumeLevel >= 100) volumeLevel = 100;

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
