class Game{
  constructor(){
    var self = this;

    this.startTime = Date.now();
    this.score = 0;

    this.beatIndex = 0;
    this.song = ['c', '0', '0', 'c'];

    this.queue = new Queue();
    this.dancer = new Dancer();

    this.toneListener = new ToneListener();
    this.toneListener.emitter.addListener('new-tone', function(tone){
      var pass = self.queue.compareTone(tone);
      if(pass) self.updateScore();
      else self.dancer.fail();
    });

    this.emitter = new EventEmitter();

    requestAnimationFrame(function(){
      self.frame(self);
    });
  }



  updateScore(){
    this.score++;
    $el.score.style.height = 100*(this.score/20) + '%';
    if(this.score >= 3){
      this.dancer.pause();
      this.emitter.emitEvent('done', []);
    }
  }


  frame(ctx){
    var context = ctx;
    var now  = Date.now();
    var diff = ((now - context.startTime)/1000)*(Utils.config.bpm/60);
    var quarter = diff*4;

    if(quarter > context.beatIndex){
      var beat = context.song[context.beatIndex];
      if(beat && beat != '0')
        context.queue.addBeat(beat);
      context.beatIndex++;
    }

    context.toneListener.getCurrentTone();
    context.queue.animate(now);

    // recurse
    requestAnimationFrame(function(){
      context.frame(context);
    });
  }
}
