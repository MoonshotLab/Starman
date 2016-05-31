// Sound capturing utilities
Scream.SC = class SoundCapture {


  constructor(opts){
    // configuration
    if(!opts) opts = {};
    this.emissionRate = opts.emissionRate || 100;
    this.nodeCount = opts.nodeCount || 4;

    // retain
    this.emitter = new EventEmitter();
    this.audioContext = new AudioContext();
    this.analyser = this.audioContext.createAnalyser();

    // class properties
    this.volume = 0;
    this.frequencyData = [];
  }



  // pass a device label
  // returns their media info
  static getDevice(deviceName, next){
    var foundDevice = null;
    navigator.mediaDevices.enumerateDevices().then(function(devices){
      devices.forEach(function(device){
        if(deviceName == device.label && device.kind == 'audioinput'){
          foundDevice = device;
        }
      });

      next(foundDevice);
    });
  }



  // pass a device's media info
  listen(device){
    var self = this;

    navigator.getUserMedia({
      audio : {
        optional : [{ sourceId : device.sourceId }]
      }
    }, startStream, handleError);

    function startStream(stream){
      var mediaStreamSource = self.audioContext.createMediaStreamSource(stream);
      var frequencyData = new Uint8Array(self.analyser.frequencyBinCount);
      mediaStreamSource.connect(self.analyser);

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
    var roundedData = [];

    // create placeholders for the rounded data
    for(var j=0; j<self.nodeCount; j++){
      roundedData.push(0);
    }

    // calculate the volume and frequency data
    for(var i=0; i<data.length; i++){
      volume += data[i];

      var index = Math.floor(i/(data.length/self.nodeCount));
      roundedData[index] += data[i];
    }

    // average out the frequency data
    for(var a=0; a<roundedData.length; a++){
      roundedData[a] = Math.round(
        roundedData[a]/(data.length/self.nodeCount)
      );
    }

    self.frequencyData = roundedData;
    self.volume = Math.round(volume/data.length);

    self.emitter.emitEvent('sound', [self.volume, self.frequencyData]);
  }
};
