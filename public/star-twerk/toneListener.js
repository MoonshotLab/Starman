class ToneListener{
  constructor(){
    var self = this;

    // make the tone set available to external classes
    this.toneSet = ['lo', 'hi', 'clap'];

    // only process tone if wait has been turned off
    this.wait = false;

    // emiter
    this.emitter = new EventEmitter();

    // retain left and right channel data
    this.left  = { volume : 0, frequency : []};
    this.right = { volume : 0, frequency : []};

    // listen to the socket and remember volume and frequency
    Scream.socket.on('stage-left', function(data){
      self.left = data;
    });
    Scream.socket.on('stage-right', function(data){
      self.right = data;
    });
  }



  getCurrentTone(){
    var self = this;
    var volume = ((this.left.volume + this.right.volume)/2)/Utils.config.sensitivity;

    if(volume > Utils.config.loThreshold && this.wait === false){
      this.wait = true;

      setTimeout(function(){ self.wait = false; }, 1000);

      var mixed = [];
      this.left.frequency.forEach(function(value, i){
        mixed[i] = value;
      });
      this.right.frequency.forEach(function(value, i){
        mixed[i] = (mixed[i] + value)/2;
      });

      // find the frequency bucket with highest and lowest values
      var max = Math.max(...mixed);
      var min = Math.min(...mixed);
      var maxIndex = mixed.indexOf(max);
      var minIndex = mixed.indexOf(min);

      // find the average distance from the max
      var average = 0;
      mixed.forEach(function(item){
        average += Math.abs(max - item);
      });
      average = Math.round(average/mixed.length);

      // determine tone based on highest and lowest frequency buckets
      var tone;
      var upperThird = Utils.config.frequencyNodeCount*0.666;
      var lowerThird = Utils.config.frequencyNodeCount*0.333;
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



  getRandomTone(){
    var index = Utils.random(0, this.toneSet.length - 1);
    return this.toneSet.name;
  }
}
