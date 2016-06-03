(function(){

  // speed of the moves
  var speed = 0.5;
  var points = 0;


  // create the tone listener
  var toneListener = new ToneListener();
  toneListener.emitter.addListener('new-tone', function(tone){
    var pass = queue.compareTone(tone);
    if(pass) addPoints();
    else removePoints();
  });


  // create the queue and add a move
  var queue = new Queue();
  queue.addMove(toneListener.getRandomTone());


  // scoreboard
  var addPoints = function(){
    points += 1;
  };
  var removePoints = function(){
    points -= 1;
  };


  // add a new move every so often
  // and increment the speed
  setInterval(function(){
    queue.addMove(toneListener.getRandomTone());

    speed += 0.01;
    if(speed >= 2.5) speed = 2.5;
  }, 2000);


  // request the animation frame and animate
  var frame = function(){
    queue.animate(speed);

    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);

})();
