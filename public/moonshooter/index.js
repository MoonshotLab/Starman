(function(){
  // retain
  var powerLevel = 0;
  var numGameFrames = 9;
  var numWinFrames = 30;
  var animationFrame = null;

  // retain dom elements
  var $el = {
    volume : $('#volume'),
    power : $('#power'),
    framed : $('#framed')
  };



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



  // click listeners for the button screens
  $('#demo-button').click(function(){
    $('#select')[0].play();
    $('#play').hide();
    $('#instructions').show();
    $('#instructions')[0].play();
  });

  $('#play-button').click(function(){
    $('#select')[0].play();
    $('#play').hide();
    $('#build-up').show();
    $('#build-up')[0].play();
  });

  $('#next-game-button').click(function(){
    window.location.href = '/office-space';
  });

  $('#replay-button').click(function(){
    $('#replay').hide();
    $('#build-up').show();
    $('#build-up')[0].play();
  });



  // when intro video is done, hide it and show the button screen
  $('#intro')[0].addEventListener('ended', function(){
    $('#intro').hide();
    $('#play').show();
  },false);

  // when instructions video is done, hide it and start the build up vid
  $('#instructions')[0].addEventListener('ended', function(){
    $('#instructions').hide();
    $('#build-up').show();
    $('#build-up')[0].play();
  },false);

  $('#build-up')[0].addEventListener('ended', function(){
    startGame();
  });

  // when outro video is done, hide it and show the replay screen
  $('#outro')[0].addEventListener('ended', function(){
    $('#outro').hide();
    $('#replay').show();
  });



  // preload all the images
  for(var i = 1; i < numGameFrames; i++) {
    new Image().src = './moonshooter/img/game_frame_' + i + '.jpg';
  }
  for(var j = 1; j < numWinFrames; j++) {
    new Image().src = './moonshooter/img/win_frame_' + j + '.jpg';
  }



  var startGame = function(){
    $('#game').show();
    $('#music')[0].pause();
    animationFrame = window.requestAnimationFrame(calculatePower);
  };



  // setup the high and low position selectors
  var hiPos = (100 - Starman.utils.config.hiThreshold);
  var loPos = Starman.utils.config.loThreshold;
  $('#target-hi').css('height', hiPos + '%');
  $('#target-lo').css('height', Starman.utils.config.loThreshold + '%');



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

    $el.volume.css('height', volumeLevel + '%');
    $el.power.css('height', powerLevel + '%');

    var videoFrame = Math.round((powerLevel/100) * numGameFrames);
    if(videoFrame <= 0) videoFrame = 1;
    if(videoFrame >= numGameFrames) videoFrame = numGameFrames;

    $el.framed[0].src = './moonshooter/img/game_frame_' + videoFrame + '.jpg';

    if(powerLevel >= 100){
      powerLevel = 0;
      showWinScreen();
    } else{
      window.requestAnimationFrame(calculatePower);
    }
  }


  function showWinScreen(){
    // show the win text and play the sound
    $('#winner').show();
    $('#audio-win')[0].play();
    $('#music')[0].play();
    $('#build-up').hide();

    // play the win screen animation and launch sound
    $('#audio-launch')[0].play();
    var activeFrame = 1;
    var frameInterval = setInterval(function(){
      if(activeFrame <= numWinFrames){
        $el.framed[0].src = './moonshooter/img/win_frame_' + activeFrame + '.jpg';
        activeFrame++;
      }

      // if win screen animation is done
      if(activeFrame >= numWinFrames){
        // stop animating
        clearInterval(frameInterval);

        // wait, then show outro video
        setTimeout(function(){
          $('#outro').show();
          $('#game').hide();
          $('#outro')[0].play();
        }, 3000);
      }
    }, 100);
  }
})();
