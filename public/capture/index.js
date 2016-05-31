(function(){
  var socket = io();
  var queryParams = {};

  // get query paramaters
  var query = location.search.replace('?', '');
  var queryArray = query.split('&');

  queryArray.forEach(function(item){
    var splitz = item.split('=');
    queryParams[splitz[0]] = splitz[1];
  });

  if(queryParams.stage){
    var stage = queryParams.stage;

    // create a sound capture instance
    var soundCapture = new Scream.SC({
      emissionRate : Utils.config.emissionRate
    });

    var deviceName = 'Default';
    if(stage == 'left') deviceName = 'Default';
    else if(stage == 'right') deviceName = 'AudioBox USB';

    // startup the device
    Scream.SC.getDevice(deviceName, function(device){
      soundCapture.listen(device);
    });

    // emit the stage left or right sound to the server
    soundCapture.emitter.addListener('sound', function(volume, frequency){
      socket.emit('stage-' + stage, {
        volume : volume,
        frequency : frequency
      });
    });
  }
})();
