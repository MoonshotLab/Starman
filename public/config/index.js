(function(){

  // create dom selectors
  window.$el = {
    rangeSelectors : {
      sensitivity : document.getElementById('sensitivity'),
      loThreshold : document.getElementById('loThreshold'),
      hiThreshold : document.getElementById('hiThreshold')
    },
    channels : {
      left : {
        volume : $('#channel-left').find('.volume'),
        volumeVal : $('#channel-left').find('.volume-val'),
        frequencies : []
      },
      right : {
        volume : $('#channel-right').find('.volume'),
        volumeVal : $('#channel-right').find('.volume-val'),
        frequencies : []
      }
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

    // append empty frequency templates
    if(data.frequencyNodeCount){
      var $frequencies = $('.frequencies');

      // make the templates and append
      for(var i=0; i<Number(data.frequencyNodeCount); i++){
        var div = createFrequencyTemplate();
        $frequencies.append(div);
      }

      // assign
      $el.channels.left.frequencies  = $('#channel-left').find('.frequency-wrapper');
      $el.channels.right.frequencies = $('#channel-right').find('.frequency-wrapper');

      // give a width to each one
      $el.channels.left.frequencies.forEach(function(el){
        $(el).width((1/data.frequencyNodeCount)*100 + '%');
      });
      $el.channels.right.frequencies.forEach(function(el){
        $(el).width((1/data.frequencyNodeCount)*100 + '%');
      });
    }
  });


  // update the stage left and right meters
  Scream.socket.on('stage-left', function(data){
    updateDom('left', data);
  });

  Scream.socket.on('stage-right', function(data){
    updateDom('right', data);
  });


  var updateDom = function(side, data){
    // update the volume val
    $el.channels[side].volumeVal[0].innerHTML = Math.round(data.volume/Utils.config.sensitivity);

    // update the volume bar
    var volumeHeight = Math.round(data.volume/Utils.config.sensitivity);
    if(volumeHeight > 100) volumeHeight = 100;
    $el.channels[side].volume[0].style.height = volumeHeight + '%';

    // update the frequency bars
    data.frequency.forEach(function(frequency, i){
      $($el.channels[side].frequencies[i]).find('.frequency-val').html(frequency);

      var height = Math.round(frequency/Utils.config.sensitivity);
      if(height > 100) height = 100;
      $($el.channels[side].frequencies[i]).find('.frequency')[0].style.height = height + '%';
    });
  };


  // loop over each range selector and attach event listeners
  for(var key in $el.rangeSelectors){
    var $selector = $el.rangeSelectors[key];
    $selector.onchange = function(e){
      var type = e.target.id;
      var val  = e.target.value;
      var data = {};
      data[type] = val;
      Scream.socket.emit('config-update', data);
    };
  }


  // create an html template for frequency data
  var createFrequencyTemplate = function(){
    return [
      '<div class="frequency-wrapper">',
        '<h3 class="frequency-val"></h3>',
        '<div class="frequency-container">',
          '<div class="frequency"></div>',
        '</div>',
      '</div>'
    ].join('');
  };
})();
