(function(){
  var speed = 0.1;


  // create the queue and add a move
  var queue = new Queue();
  queue.addMove();


  // add a new move every so often
  // and increment the speed
  setInterval(function(){
    queue.addMove();

    speed += 0.1;
    if(speed >= 2.5) speed = 2.5;
  }, 500);


  // request the animation frame
  var frame = function(){
    queue.animate(speed);
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);

})();
