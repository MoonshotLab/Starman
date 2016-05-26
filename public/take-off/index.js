// reference some dom elements
var $ = {
  volume : document.getElementById('volume'),
  power : document.getElementById('power'),
  targetHi : document.getElementById('target-hi'),
  targetLo : document.getElementById('target-lo')
};
$.targetHi.style.top = (100 - Utils.config.hiThreshold) + '%';
$.targetLo.style.top = (100 - Utils.config.loThreshold) + '%';

// create a sound capture instance
var soundCapture = new Scream.SC({
  emissionRate : Utils.config.emissionRate
});


// startup the device
Scream.SC.getDevice('Default', function(device){
  soundCapture.listen(device);
});


// listen for volume changes and react
var powerLevel = 0;
soundCapture.emitter.addListener('volume', function(volume){
  var volumeLevel = (volume/Utils.config.maxVolume)*100;
  if(volumeLevel >= 100) volumeLevel = 100;

  if(volumeLevel < Utils.config.hiThreshold && volumeLevel > Utils.config.loThreshold){
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
