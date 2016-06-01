(function(){

  // retain
  var socket = io();
  var powerLevel = 0;
  var numberOfFrames = 123;

  var volume = {
    left : 0,
    right : 0
  };



  // reference some dom elements
  var $ = {
    volume : document.getElementById('volume'),
    power : document.getElementById('power'),
    targetHi : document.getElementById('target-hi'),
    targetLo : document.getElementById('target-lo'),
    video : document.getElementById('video')
  };
  $.targetHi.style.top = (100 - Utils.config.hiThreshold) + '%';
  $.targetLo.style.top = (100 - Utils.config.loThreshold) + '%';


  // preload all the images
  var images = [];
  for(var i = 1; i < numberOfFrames; i++) {
    images[i] = new Image();
    images[i].src = './img/frame_' + i + '.png';
  }


  // listen for volume changes and react
  socket.on('stage-left', function(data){
    volume.left = data.volume;
    calculatePower();
  });

  socket.on('stage-right', function(data){
    volume.right = data.volume;
    calculatePower();
  });

  socket.on('config-update', function(data){
    $.targetHi.style.top = (100 - Utils.config.hiThreshold) + '%';
    $.targetLo.style.top = (100 - Utils.config.loThreshold) + '%';

    if(data.loThreshold){
      $.targetLo.style.top = (100 - data.loThreshold) + '%';
    } else if(data.hiThreshold){
      $.targetHi.style.top = (100 - data.hiThreshold) + '%';
    }
  });


  function calculatePower(){
    var averageVolume = (volume.left + volume.right)/2;
    var volumeLevel = Math.round(averageVolume/Utils.config.sensitivity);
    if(volumeLevel >= 100) volumeLevel = 100;

    if(volumeLevel < Utils.config.hiThreshold && volumeLevel > Utils.config.loThreshold){
      powerLevel += 0.025;
    } else {
      powerLevel -= 0.025;
      if(powerLevel <= 0) powerLevel = 0;
    }

    $.volume.style.height = volumeLevel + '%';
    $.power.style.height = powerLevel + '%';

    var videoFrame = Math.round((powerLevel/100) * numberOfFrames);
    if(videoFrame <= 0) videoFrame = 1;
    if(videoFrame >= numberOfFrames) videoFrame = numberOfFrames;

    $.video.src = './img/frame_' + videoFrame + '.png';

    if(powerLevel >= 100){
      // alert('BLAST OFF!');
      powerLevel = 100;
    }
  }

})();
