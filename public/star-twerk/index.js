(function(){

  // speed of the moves
  var speed = 0.5;


  // create the tone listener
  var toneListener = new ToneListener();


  // create the queue and add a move
  var queue = new Queue();
  queue.addMove(toneListener.getRandomTone());


  // add a new move every so often
  // and increment the speed
  setInterval(function(){
    queue.addMove(toneListener.getRandomTone());

    speed += 0.01;
    if(speed >= 2.5) speed = 2.5;
  }, 2000);


  // request the animation frame and animate
  var frame = function(){
    var tone = toneListener.getCurrentTone();
    queue.animate(speed);

    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);

})();
