var config = {
  width : 800,
  height : 400
};

var socket = io();
var game = new Game(config);


socket.on('stage-left', function(volume){
  console.log(volume);
});


window.speed = 0;
document.onkeydown = function(e){
  if(e.keyCode == 39){
    window.speed = 150;
  } else if(e.keyCode == 37){
    window.speed = -150;
  } else{
    window.speed = 0;
  }
};
