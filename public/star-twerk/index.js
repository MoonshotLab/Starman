(function(){

  var song = [
    '0', '0', '0', '0',
    'l', '0', 'c', '0',
    'l', 'l', 'c', '0',
    'l', '0', 'c', '0',
    'l', 'l', 'c', '0',
    'l', '0', 'h', '0',
    'l', 'l', 'h', '0',
    '0', '0', '0', '0',
    'l', '0', 'c', '0',
    'l', 'l', 'c', '0',
    'l', '0', 'c', '0',
    'l', 'l', 'c', '0',
    'l', '0', 'h', '0',
    'l', 'l', 'h', '0',
    '0', '0', '0', '0',
    'l', '0', 'c', '0',
    'l', 'l', 'c', '0',
    'l', '0', 'c', '0',
    'l', 'l', 'c', '0',
    'l', '0', 'h', '0',
    'l', 'l', 'h', '0',
    '0', '0', '0', '0',
    'l', '0', 'c', '0',
    'l', 'l', 'c', '0',
    'l', '0', 'c', '0',
    'l', 'l', 'c', '0',
    'l', '0', 'h', '0',
    'l', 'l', 'h', '0',
    '0', '0', '0', '0',
    'l', '0', 'c', '0',
    'l', 'l', 'c', '0',
    'l', '0', 'c', '0',
    'l', 'l', 'c', '0',
    'l', '0', 'h', '0',
    'l', 'l', 'h', '0',
    '0', '0', '0', '0',
    'l', '0', 'c', '0',
    'l', 'l', 'c', '0',
    'l', '0', 'c', '0',
    'l', 'l', 'c', '0',
    'l', '0', 'h', '0',
    'l', 'l', 'h', '0',
    '0', '0', '0', '0',
    'l', '0', 'c', '0',
    'l', 'l', 'c', '0',
    'l', '0', 'c', '0',
    'l', 'l', 'c', '0',
    'l', '0', 'h', '0',
    'l', 'l', 'h', '0',
    '0', '0', '0', '0',
    'l', '0', 'c', '0',
    'l', 'l', 'c', '0',
    'l', '0', 'c', '0',
    'l', 'l', 'c', '0',
    'l', '0', 'h', '0',
    'l', 'l', 'h', '0'
  ];


  // retain
  var game = null;



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
    window.location.href = '/moonshooter';
  });

  $('#replay-button').click(function(){
    $('#replay').hide();
    startGame();
  });



  // when intro video is done, hide it and show the button screen
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



  // when the intro video is done, hide it and begin game
  var startGame = function(){
    $('#music')[0].pause();
    $('#game').show();

    game = new Game({ song : song });
    game.emitter.on('done', function(){
      game.pause = true;
      game.reset();
      $('#outro').show();

      setTimeout(function(){
        game = null;
        $('#game').hide();
        $('#outro')[0].play();
      }, 100);
    });
  };

})();
