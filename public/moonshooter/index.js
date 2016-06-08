(function(){

  // retain
  var powerLevel = 0;
  var numGameFrames = 67;
  var numWinFrames = 30;

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
    framed : document.getElementById('framed'),
    winner : document.getElementById('winner')
  };


  // preload all the images
  for(var i = 1; i < numGameFrames; i++) {
    new Image().src = './img/game_frame_' + i + '.jpg';
  }
  for(var j = 1; j < numWinFrames; j++) {
    new Image().src = './img/win_frame_' + j + '.jpg';
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

    var videoFrame = Math.round((powerLevel/100) * numGameFrames);
    if(videoFrame <= 0) videoFrame = 1;
    if(videoFrame >= numGameFrames) videoFrame = numGameFrames;

    // $.framed.src = './img/game_frame_' + videoFrame + '.jpg';

    if(powerLevel >= 100){
      powerLevel = 100;
      showWinScreen();
    } else{
      window.requestAnimationFrame(calculatePower);
    }
  }


  function showWinScreen(){
    // play the win screen animation
    var activeFrame = 1;
    setInterval(function(){
      if(activeFrame <= numWinFrames){
        $.framed.src = './img/win_frame_' + activeFrame + '.jpg';
        activeFrame++;
      }
    }, 100);

    // blink the winner screen
    setInterval(function(){
      if($.winner.style.display == 'block'){
        $.winner.style.display = 'none';
      } else{
        $.winner.style.display = 'block';
      }
    }, 350);
  }


  // animate
  window.requestAnimationFrame(calculatePower);
})();
