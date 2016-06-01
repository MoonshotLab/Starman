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
