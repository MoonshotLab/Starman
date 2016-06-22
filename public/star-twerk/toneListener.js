class ToneListener{
  constructor(){
    var self = this;

    // make the tone set available to external classes
    // boom, woo, clap... respectively
    this.toneSet = ['l', 'h', 'c'];

    // only process tone if wait has been turned off
    this.wait = false;

    // emiter
    this.emitter = new EventEmitter();

    // retain left and right channel data
    this.left  = { volume : 0, frequency : []};
    this.right = { volume : 0, frequency : []};

    // create a new instance of a sound capture device
    var soundCapture = new Starman.SC({
      frequencyNodeCount : Starman.utils.config.frequencyNodeCount
    });

    soundCapture.listen(function(err){
      if(err) alert(JSON.stringify(err));
    });

    // get the volume from the sound capture instance
    soundCapture.emitter.addListener('sound', function(vol, freq){
      this.volume = vol;
      this.frequency = freq;
    });
  }



  getCurrentTone(){
    var self = this;
    var volume = this.volume/Starman.utils.config.sensitivity;

    if(volume > Starman.utils.config.loThreshold && this.wait === false){
      this.wait = true;

      setTimeout(function(){ self.wait = false; }, 300);

      // find the frequency bucket with highest and lowest values
      var max = Math.max(...this.frequency);
      var min = Math.min(...this.frequency);
      var maxIndex = this.frequency.indexOf(max);
      var minIndex = this.frequency.indexOf(min);

      // find the average distance from the max
      var average = 0;
      this.frequency.forEach(function(item){
        average += Math.abs(max - item);
      });
      average = Math.round(average/this.frequency.length);

      // determine tone based on highest and lowest frequency buckets
      var tone;
      var upperThird = Starman.utils.config.frequencyNodeCount*0.666;
      var lowerThird = Starman.utils.config.frequencyNodeCount*0.333;
      if(maxIndex > upperThird && minIndex < lowerThird){
        // hi
        tone = this.toneSet[1];
      } else if(maxIndex < lowerThird && minIndex > upperThird){
        // lo
        tone = this.toneSet[0];
      } else{
        // clap?
        tone = this.toneSet[2];
      }

      // emit a tone event
      this.emitter.emitEvent('new-tone', [tone]);

      // log
      console.log('min        :', min);
      console.log('max        :', max);
      console.log('diff       :', max - min);
      console.log('average    :', average);
      console.log('min-index  :', minIndex);
      console.log('max-index  :', maxIndex);
      console.log('tone       :', tone);
      console.log('--------------');
    }
  }
}
