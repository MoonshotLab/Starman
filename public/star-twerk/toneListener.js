class ToneListener{
  constructor(){
    var self = this;

    // the current tones being produced
    this.tones = [];
    this.toneSet = ['hi', 'lo', 'clap'];

    // left and right channel data
    this.left  = { volume : 0, frequency : []};
    this.right = { volume : 0, frequency : []};

    // listen to the socket and remember volume
    // and frequency, determine tones
    Scream.socket.on('stage-left', function(data){
      self.left = data;
    });

    Scream.socket.on('stage-right', function(data){
      self.right = data;
    });
  }



  getCurrentTone(){
    // mix the left and right channels
    var mixed = [];
    this.left.frequency.forEach(function(value, i){
      mixed[i] = value;
    });
    this.right.frequency.forEach(function(value, i){
      mixed[i] = mixed[i] + value;
    });

    // find which tone
    var tone;
    var max = Math.max(...mixed);
    var index = mixed.indexOf(max);
    if(index > Utils.frequencyNodeCount/2){
      tone = this.toneSet[0];
    } else if(index < Utils.frequencyNodeCount/2){
      tone = this.toneSet[1];
    } else{
      tone = this.toneSet[2];
    }

    return tone;
  }



  getRandomTone(){
    var index = Utils.random(0, this.toneSet.length - 1);
    return this.toneSet.name;
  }
}
