(function(){
  // make a song
  var beatIndex = 0;
  var song = [];


  // create a queue and assign bpms
  var queue = new Queue();


  // create a tone listener
  var toneListener = new ToneListener();
  toneListener.emitter.addListener('new-tone', function(tone){
    var pass = queue.compareTone(tone);
    if(pass) console.log('pass');
    else console.log('fail');
  });


  // determine if it's time to add a new note
  // request the animation frame and animate
  var startTime = Date.now();
  var frame = function(){
    var now  = Date.now();
    var diff = ((now - startTime)/1000)*(Utils.config.bpm/60);
    var quarter = diff*4;

    if(quarter > beatIndex){
      var beat = song[beatIndex];
      if(beat && beat != '0')
        queue.addBeat(beat);
      beatIndex++;
    }

    queue.animate(now);
    requestAnimationFrame(frame);
  };


  // start animating
  requestAnimationFrame(frame);
})();
