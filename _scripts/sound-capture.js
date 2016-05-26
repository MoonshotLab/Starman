// Sound capturing utilities
Scream.SC = class SoundCapture {


  constructor(opts){
    // configuration
    if(!opts) opts = {};
    this.emissionRate = opts.emissionRate || 100;

    // retain
    this.emitter = new EventEmitter();
    this.audioContext = new AudioContext();
    this.processor = this.audioContext.createScriptProcessor(512, 2, 2);

    // class properties
    this.volume = 0;

    this.startEmission();
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

      mediaStreamSource.connect(self.processor);
      self.processor.connect(self.audioContext.destination);

      self.processor.shutdown = function(){
        this.disconnect();
      };

      self.processor.onaudioprocess = function(e){
        var buffer = e.inputBuffer.getChannelData(0);
        var sumBuffer = 0;
        for (var i = 0; i < buffer.length; i++) {
          sumBuffer += buffer[i] * buffer[i];
        }

        var rms = Math.sqrt(sumBuffer / buffer.length);
        self.volume = Math.floor(rms*1000);
      };
    }

    function handleError(err){
      self.emitter.emitEvent('error', err);
    }
  }



  // emit
  startEmission(){
    var self = this;

    setInterval(function(){
      self.emitter.emitEvent('volume', [self.volume]);
    }, this.emissionRate);
  }
};
