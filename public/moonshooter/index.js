(function(){

  // retain
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
    targetHiText : document.getElementById('target-hi-text'),
    targetLoText : document.getElementById('target-lo-text'),
    targetText : document.getElementById('target-text'),
    video : document.getElementById('video')
  };


  // preload all the images
  var images = [];
  for(var i = 1; i < numberOfFrames; i++) {
    images[i] = new Image();
    images[i].src = './img/frame_' + i + '.png';
  }


  // listen for volume changes and react
  Scream.socket.on('stage-left', function(data){
    volume.left = data.volume;
  });

  Scream.socket.on('stage-right', function(data){
    volume.right = data.volume;
  });

  Scream.socket.on('config-update', function(data){
    var hiPos = (100 - Utils.config.hiThreshold);
    $.targetHi.style.top = hiPos + '%';
    $.targetHiText.style.top = hiPos + '%';

    var loPos = (100 - Utils.config.loThreshold);
    $.targetLo.style.top = loPos + '%';
    $.targetLoText.style.top = loPos + '%';

    var targetPos = (hiPos + (loPos - hiPos)/2);
    $.targetText.style.top = targetPos + '%';
  });


  function calculatePower(){
    var averageVolume = (volume.left + volume.right)/2;
    var volumeLevel = Math.round(averageVolume/Utils.config.sensitivity);
    if(volumeLevel >= 100) volumeLevel = 100;

    if(volumeLevel < Utils.config.hiThreshold && volumeLevel > Utils.config.loThreshold){
      powerLevel += 1;
    } else {
      powerLevel -= 1;
      if(powerLevel <= 0) powerLevel = 0;
    }

    $.volume.style.height = volumeLevel + '%';
    $.power.style.height = powerLevel + '%';

    var videoFrame = Math.round((powerLevel/100) * numberOfFrames);
    if(videoFrame <= 0) videoFrame = 1;
    if(videoFrame >= numberOfFrames) videoFrame = numberOfFrames;

    $.video.src = './img/frame_' + videoFrame + '.png';

    if(powerLevel >= 100){
      powerLevel = 100;
    }

    window.requestAnimationFrame(calculatePower);
  }

  // animate
  window.requestAnimationFrame(calculatePower);

})();
