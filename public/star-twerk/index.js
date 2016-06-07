(function(){

  // store points
  var points = 0;


  // create the tone listener
  var toneListener = new ToneListener();
  toneListener.emitter.addListener('new-tone', function(tone){
    var pass = queue.compareTone(tone);
    if(pass) addPoints();
    else removePoints();
  });


  // create the queue and add a move
  var queue = new Queue({ bpm : 60 });
  queue.addMove(toneListener.getRandomTone());


  // scoreboard
  var addPoints = function(){
    points += 1;
  };
  var removePoints = function(){
    points -= 1;
  };


  // request the animation frame and animate
  var frame = function(){
    queue.animate(Date.now());
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);

})();
