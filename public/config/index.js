(function(){

  // create dom selectors
  var $ = {
    rangeSelectors : {
      sensitivity : document.getElementById('sensitivity'),
      loThreshold : document.getElementById('loThreshold'),
      hiThreshold : document.getElementById('hiThreshold'),
      emissionRate : document.getElementById('emissionRate')
    },
    volume :{
      left : document.getElementById('stageLeft'),
      leftVal : document.getElementById('stageLeft-val'),
      right : document.getElementById('stageRight'),
      rightVal : document.getElementById('stageRight-val'),
    }
  };


  // listen for configuration updates
  Scream.socket.on('config-update', function(data){
    for(var key in data){
      if(document.getElementById(key)){
        document.getElementById(key).value = data[key];
        document.getElementById(key + '-val').innerHTML = data[key];
      }
    }
  });


  // update the stage left and right meters
  Scream.socket.on('stage-left', function(data){
    $.volume.leftVal.innerHTML = Math.round(data.volume/Utils.config.sensitivity);

    var height = data.volume/Utils.config.sensitivity;
    if(height > 100) height = 100;
    $.volume.left.style.height = height + '%';
  });

  Scream.socket.on('stage-right', function(data){
    $.volume.rightVal.innerHTML = Math.round(data.volume/Utils.config.sensitivity);

    var height = data.volume/Utils.config.sensitivity;
    if(height > 100) height = 100;
    $.volume.right.style.height = height + '%';
  });


  // loop over each range selector and attach event listeners
  for(var key in $.rangeSelectors){
    var $selector = $.rangeSelectors[key];
    $selector.onchange = function(e){
      var type = e.target.id;
      var val  = e.target.value;
      var data = {};
      data[type] = val;
      Scream.socket.emit('config-update', data);
    };
  }


})();
