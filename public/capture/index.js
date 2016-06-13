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

  // create ONE AND ONLY sound capture device
  var soundCapture = new Scream.SC({
    frequencyNodeCount : 32
  });

  // wait for the config to load
  Scream.socket.on('config-update', function(data){
    var stage = queryParams.stage;

    // startup the device
    Scream.SC.getDevice(stage, function(err, device){
      var result;
      if(!err){
        soundCapture.listen(device, function(err){
          var res;
          if(err) res = err;
          else res = 'Connected to Stage ' + stage;
          document.getElementById('status').innerHTML = res;
        });
      } else {
        document.getElementById('status').innerHTML = err;
      }
    });

    // emit the stage left or right sound to the server
    soundCapture.emitter.addListener('sound', function(volume, frequency){
      socket.emit('stage-' + stage, {
        volume : volume,
        frequency : frequency
      });
    });
  });
})();
