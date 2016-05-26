var config = {
  width : 800,
  height : 400
};


var game = new Game(config);


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
