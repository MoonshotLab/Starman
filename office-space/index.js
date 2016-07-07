(function(){

  var obstacleMap = [
    { name : 'tape',        x : 05,  y : -1 },
    { name : 'glue',        x : 10,  y : 1  },
    { name : 'rubberBand',  x : 15,  y : 0  },
    { name : 'bell',        x : 20,  y : -1 },
    { name : 'stapler',     x : 25,  y : 1  },
    { name : 'pins',        x : 30,  y : 0  },
    { name : 'postit',      x : 35,  y : 1  },
    { name : 'whiteOut',    x : 40,  y : -1 },
    { name : 'coffee',      x : 45,  y : 1  },
    { name : 'tape',        x : 50,  y : -1 },
    { name : 'glue',        x : 55,  y : 1  },
    { name : 'rubberBand',  x : 60,  y : 0  },
    { name : 'bell',        x : 65,  y : -1 },
    { name : 'stapler',     x : 70,  y : 1  },
    { name : 'pins',        x : 75,  y : 0  },
    { name : 'postit',      x : 80,  y : 1  },
    { name : 'whiteOut',    x : 85,  y : -1 },
    { name : 'coffee',      x : 90,  y : 1  }
  ];

  // retain volume containers
  var $el = {
    volume : $('#volume').find('.volume'),
    game : document.getElementById('gameplay'),
    intro : document.getElementById('intro'),
    outro : document.getElementById('outro'),
    winner : document.getElementById('winner'),
    audioWin : document.getElementById('audio-win')
  };


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
    startGame();
  });

  $('#next-game-button').click(function(){
    window.location.href = '/star-twerk';
  });

  $('#replay-button').click(function(){
    $('#replay').hide();
    startGame();
  });


  // when intro ideo is done hide it and create game
  $('#intro')[0].addEventListener('ended', function(){
    $('#intro').hide();
    $('#play').show();
  },false);

  // when instructions video is done, hide it and begin the game
  $('#instructions')[0].addEventListener('ended', function(){
    $('#instructions').hide();
    startGame();
  },false);

  // when outro video is done, hide it and show the replay screen
  $('#outro')[0].addEventListener('ended', function(){
    $('#outro').hide();
    $('#replay').show();
  });


  // star the game
  function startGame(){
    $('#music')[0].pause();
    $('#gameplay').show();

    var game = new Game({
      width : window.innerWidth,
      height : window.innerHeight,
      obstacleMap : obstacleMap,
    });

    // listen for when game is done
    game.emitter.on('done', function(){
      $el.audioWin.play();
      $el.winner.style.display = 'block';

      setTimeout(function(){
        $('#gameplay').hide();
        $('#outro').show();
        $('#outro')[0].play();
        $('#music')[0].play();
      }, 2000);
    });


    // create a new instance of a sound capture device
    var soundCapture = new Starman.SC({
      frequencyNodeCount : Starman.utils.config.frequencyNodeCount
    });

    soundCapture.listen(function(err){
      if(err) alert(JSON.stringify(err));
    });

    // get the volume from the sound capture instance
    soundCapture.emitter.addListener('sound', function(vol, freq){
      var volume = Math.round(vol/Starman.utils.config.sensitivity);
      if(volume >= 100) volume = 100;
      $el.volume.css('height', volume + '%');
      game.volume = volume;
    });
  }

})();
