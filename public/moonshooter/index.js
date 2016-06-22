(function(){
  // retain
  var powerLevel = 0;
  var numGameFrames = 9;
  var numWinFrames = 30;


  // create a new instance of a sound capture device
  var soundCapture = new Starman.SC({
    frequencyNodeCount : Starman.utils.config.frequencyNodeCount
  });

  soundCapture.listen(function(err){
    if(err) alert(JSON.stringify(err));
  });

  // get the volume from the sound capture instance
  soundCapture.emitter.addListener('sound', function(vol, freq){
    volume = vol;
  });


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
    gameplay : document.getElementById('gameplay'),
    audioWin : document.getElementById('audio-win'),
    audioLaunch : document.getElementById('audio-launch')
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


  // setup the high and low position selectors
  var hiPos = (100 - Starman.utils.config.hiThreshold);
  var loPos = Starman.utils.config.loThreshold;
  $.targetHi.style.height = hiPos + '%';
  $.targetLo.style.height = Starman.utils.config.loThreshold + '%';


  function calculatePower(){
    var volumeLevel = Math.round(volume/Starman.utils.config.sensitivity);
    if(volumeLevel >= 100) volumeLevel = 100;

    if(volumeLevel < Starman.utils.config.hiThreshold &&
      volumeLevel > Starman.utils.config.loThreshold){
      powerLevel += 0.5;
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

    // wait a second then play the win sound
    setTimeout($.audioWin.play, 1000);

    // play the win screen animation and launch sound
    $.audioLaunch.play();
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
          $.gameplay.style.display = 'none';
          $.outro.play();
        }, 3000);
      }
    }, 100);
  }
})();
