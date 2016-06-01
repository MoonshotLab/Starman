(function(){

  var socket = io();
  window.game = new Game({
    width : 900,
    height : 850
  });


  socket.on('stage-left', function(volume){
    // game.leftVolume = volume;
  });

  socket.on('stage-right', function(volume){
    // game.rightVolume = volume;
  });


  document.onkeydown = function(e){
    if(e.keyCode == 39){
      game.leftVolume += 5;
    } else if(e.keyCode == 37){
      game.leftVolume -= 5;
      if(game.leftVolume <= 0 ) game.leftVolume = 0;
    } else if(e.keyCode == 65){
      game.rightVolume += 5;
    } else if(e.keyCode == 83){
      game.rightVolume -= 5;
      if(game.rightVolume <= 0) game.rightVolume = 0;
    }
  };

})();
