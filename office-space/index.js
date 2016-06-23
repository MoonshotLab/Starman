(function(){

  var obstacleMap = [
    { name : 'bell',        x : -1,  y : 40 },
    { name : 'coffee',      x : 1,   y : 80 },
    { name : 'postit',      x : 1,   y : 60 },
    { name : 'glue',        x : 1,   y : 20 },
    { name : 'pins',        x : 0,   y : 50 },
    { name : 'rubberBand',  x : 0,   y : 30 },
    { name : 'stapler',     x : 1,   y : 45 },
    { name : 'tape',        x : -1,  y : 10 },
    { name : 'whiteOut',    x : -1,  y : 70 },
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


  // space bar to initialize
  document.onkeydown = function(e){
    if(e.keyCode == 32){
      $el.intro.play();
      document.getElementById('identifier').style.display = 'none';
    }
  };


  // when video is done hide it and create game
  $el.intro.addEventListener('ended', function(){
    $el.intro.style.display = 'none';
    $el.game.style.display = 'block';

    startGame();
  },false);


  // star the game
  function startGame(){
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
