(function(){

  // retain
  var powerLevel = 0;
  var numGameFrames = 22;
  var numWinFrames = 17;

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
    framed : document.getElementById('framed'),
    winner : document.getElementById('winner'),
    intro : document.getElementById('intro'),
    outro : document.getElementById('outro'),
    gameplay : document.getElementById('gameplay')
  };


  // space bar to initialize
  document.onkeydown = function(e){
    if(e.keyCode == 32){
      $.intro.play();
      document.getElementById('identifier').style.display = 'none';
    }
  };

  // when video is done hide it and begin requesting animation frames
  $.intro.addEventListener('ended', function(){
    $.intro.style.display = 'none';
    $.gameplay.style.display = 'block';

    window.requestAnimationFrame(calculatePower);
  },false);


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

    var loPos = (100 - Utils.config.loThreshold);
    $.targetLo.style.top = loPos + '%';

    var targetPos = (hiPos + (loPos - hiPos)/2);
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

    $.framed.src = './img/game_frame_' + videoFrame + '.jpg';

    if(powerLevel >= 100){
      powerLevel = 100;
      showWinScreen();
    } else{
      window.requestAnimationFrame(calculatePower);
    }
  }


  function showWinScreen(){
    // show the win text
    $.winner.style.display = 'block';

    // play the win screen animation
    var activeFrame = 1;
    var frameInterval = setInterval(function(){
      if(activeFrame <= numWinFrames){
        $.framed.src = './img/win_frame_' + activeFrame + '.jpg';
        activeFrame++;
      }

      // if win screen animation is done
      if(activeFrame >= numWinFrames){
        // stop animating
        clearInterval(frameInterval);

        // wait, then show outro video
        setTimeout(function(){
          $.outro.style.display = 'block';
          setTimeout(function(){
            $.gameplay.className = '';
            $.outro.className = 'show';
            $.outro.play();
          }, 100);
        }, 2000);
      }
    }, 100);
  }
})();
