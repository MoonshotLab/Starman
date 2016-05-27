(function(){

  var socket = io();

  // create dom selectors
  var $ = {
    rangeSelectors : {
      maxVolume   : document.getElementById('maxVolume'),
      loThreshold : document.getElementById('loThreshold'),
      hiThreshold : document.getElementById('hiThreshold')
    }
  };


  // listen for configuration updates
  socket.on('config-update', function(data){
    for(var key in data){
      if(document.getElementById(key)){
        document.getElementById(key).value = data[key];
        document.getElementById(key + '-val').innerHTML = data[key];
      }
    }
  });


  // loop over each range selector and attach event listeners
  for(var key in $.rangeSelectors){
    var $selector = $.rangeSelectors[key];
    $selector.onchange = function(e){
      var type = e.target.id;
      var val  = e.target.value;
      var data = {};
      data[type] = val;
      socket.emit('config-update', data);

      document.getElementById(type + '-val').innerHTML = val;
    };
  }

})();
