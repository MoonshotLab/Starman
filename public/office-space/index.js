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
    volumeLeft : $('#stage-left').find('.volume'),
    volumeRight : $('#stage-right').find('.volume'),
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


  // star tthe game
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


    // listen to sound sockets
    Scream.socket.on('stage-left', function(data){
      var volume = Math.round(data.volume/Utils.config.sensitivity);
      if(volume >= 100) volume = 100;
      $el.volumeLeft.css('height', volume + '%');
      game.volume.left = volume;
    });

    Scream.socket.on('stage-right', function(data){
      var volume = Math.round(data.volume/Utils.config.sensitivity);
      if(volume >= 100) volume = 100;
      $el.volumeRight.css('height', volume + '%');
      game.volume.right = volume;
    });


    // have a keyboard just in case
    document.onkeydown = function(e){
      if(e.keyCode == 37){
        if(game.volume.left == 100) game.volume.left = 0;
        else game.volume.left = 100;
      } else if(e.keyCode == 39){
        if(game.volume.right == 100) game.volume.right = 0;
        else game.volume.right = 100;
      }
    };
  }

})();
