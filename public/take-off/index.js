(function(){

  // retain
  var socket = io();
  var powerLevel = 0;
  var volume = {
    left : 0,
    right : 0
  };



  // reference some dom elements
  var $ = {
    volume : document.getElementById('volume'),
    power : document.getElementById('power'),
    targetHi : document.getElementById('target-hi'),
    targetLo : document.getElementById('target-lo')
  };
  $.targetHi.style.top = (100 - Utils.config.hiThreshold) + '%';
  $.targetLo.style.top = (100 - Utils.config.loThreshold) + '%';



  // listen for volume changes and react
  socket.on('stage-left', function(vol){
    volume.left = vol;
  });

  socket.on('stage-right', function(vol){
    volume.right = vol;
  });



  // calculate the power every so often
  setInterval(calculatePower, 50);

  function calculatePower(){
    var averageVolume = volume.left + volume.right/2;
    var volumeLevel = (averageVolume/Utils.config.maxVolume)*100;
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
  }

})();
