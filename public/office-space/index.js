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
    volumeRight : $('#stage-right').find('.volume')
  };

  var game = new Game({
    width : window.innerWidth,
    height : window.innerHeight,
    obstacleMap : obstacleMap,
  });


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


  document.onkeydown = function(e){
    if(e.keyCode == 39){
      game.volume.left += 5;
    } else if(e.keyCode == 37){
      game.volume.left -= 5;
      if(game.volume.left <= 0 ) game.volume.left = 0;
    } else if(e.keyCode == 65){
      game.volume.right += 5;
    } else if(e.keyCode == 83){
      game.volume.right -= 5;
      if(game.volume.right <= 0) game.volume.right = 0;
    }
  };

})();
