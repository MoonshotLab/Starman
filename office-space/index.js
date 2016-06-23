(function(){

  var obstacleMap = [
    { name : 'bell',        x : 40,  y : -1 },
    { name : 'coffee',      x : 80,  y : 1  },
    { name : 'postit',      x : 60,  y : 1  },
    { name : 'glue',        x : 20,  y : 1  },
    { name : 'pins',        x : 50,  y : 0  },
    { name : 'rubberBand',  x : 30,  y : 0  },
    { name : 'stapler',     x : 45,  y : 1  },
    { name : 'tape',        x : 10,  y : -1 },
    { name : 'whiteOut',    x : 70,  y : -1 },
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
    $('#play').hide();
    $('#instructions').show();
    $('#instructions')[0].play();
  });

  $('#play-button').click(function(){
    $('#play').hide();
    startGame();
  });

  $('#next-game-button').click(function(){
    window.location.href = '/office-space';
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
        $el.outro.style.display = 'block';
        setTimeout(function(){
          $el.game.className = '';
          $el.outro.className = 'show';
          $el.outro.play();
        }, 100);
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
