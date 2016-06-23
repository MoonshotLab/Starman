// Sound capturing utilities
Starman.SC = class SoundCapture {


  constructor(opts){
    // configuration
    if(!opts) opts = {};
    this.frequencyNodeCount = opts.frequencyNodeCount || 4;

    // retain
    this.emitter = new EventEmitter();
    this.audioContext = new AudioContext();
    this.analyser = this.audioContext.createAnalyser();

    // class properties
    this.volume = 0;
    this.frequencyData = [];
  }



  // pass a device's media info
  listen(next){
    var self = this;

    var err;
    try{
      navigator.getUserMedia({
        audio : {}
      }, startStream, handleError);
    } catch(e){ err = e; }
    next(err, 'connecting...');

    function startStream(stream){
      // setup the media stream source and connect
      var mediaStreamSource = self.audioContext.createMediaStreamSource(stream);
      var frequencyData = new Uint8Array(self.analyser.frequencyBinCount);
      mediaStreamSource.connect(self.analyser);

      // discover the potential relevant frequency bands
      // a human voice can produce between 329.6hz and 1047hz
      self.desiredFrequencyBandIndices = [];
      var multiplier = self.audioContext.sampleRate/self.analyser.fftSize;
      for(var i=0; i<frequencyData.length; i++){
        var val = i*multiplier;
        if(val > 329.6 && val < 1047){
          self.desiredFrequencyBandIndices.push(i);
        }
      }

      // calculate the byte data every so often
      setInterval(function(){
        self.analyser.getByteFrequencyData(frequencyData);
        self.processFrequencyData(frequencyData);
      }, 10);
    }

    function handleError(err){
      self.emitter.emitEvent('error', err);
    }
  }

  processFrequencyData(data){
    var self = this;
    var volume = 0;
    var frequencies = [];

    // calculate the volume and frequency data
    for(var i=0; i<data.length; i++){
      volume += data[i];

      // only add if it's in the range of human vocal capacity
      if(self.desiredFrequencyBandIndices.indexOf(i) != -1){
        frequencies.push(data[i]);
      }
    }

    // average out the frequency data
    var roundedData = [];
    var itemsPerArray = Math.floor(frequencies.length / self.frequencyNodeCount);
    for(var j=0; j<self.frequencyNodeCount; j++){

      var average = 0;
      for(var k=0; k<itemsPerArray; k++){
        var index = itemsPerArray*j + k;
        if(frequencies[index]){
          average += frequencies[index];
        }
      }

      roundedData.push(average/itemsPerArray);
    }

    self.frequencyData = roundedData;
    self.volume = Math.round(volume/data.length);

    self.emitter.emitEvent('sound', [self.volume, self.frequencyData]);
  }
};
