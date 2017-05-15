class Game{
  constructor(opts){
    var self = this;

    this.startTime = Date.now();
    this.maxScore = 30;
    this.score = 0;
    this.$score = document.getElementById('score');

    this.beatIndex = 0;
    this.song = opts.song;

    this.pause = false;

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


  reset(){
    this.score = 0;
    this.$score.style.height = 0;
    $('#queue').empty();
  }


  updateScore(){
    this.score++;
    this.$score.style.height = 100*(this.score/this.maxScore) + '%';
    if(this.score == this.maxScore){
      this.dancer.pause();
      this.emitter.emitEvent('done', []);
    }
  }


  frame(ctx){
    var context = ctx;
    var now  = Date.now();
    var diff = ((now - context.startTime)/1000)*(Starman.utils.config.bpm/60);
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
    if(!ctx.pause){
      requestAnimationFrame(function(){
        context.frame(context);
      });
    }
  }
}
