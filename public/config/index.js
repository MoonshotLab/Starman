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
        frequencies : []
      },
      right : {
        volume : $('#channel-right').find('.volume'),
        frequencies : []
      }
    }
  };


  // listen for configuration updates
  Scream.socket.on('config-update', function(data){
    // set the range inputs
    for(var key in data){
      if(document.getElementById(key)){
        document.getElementById(key).value = data[key];
        document.getElementById(key + '-val').innerHTML = data[key];
      }
    }

    // set the thresholds
    if(data.loThreshold)
      $('.lo-threshold').css('bottom', data.loThreshold + '%');
    if(data.hiThreshold)
      $('.hi-threshold').css('bottom', data.hiThreshold + '%');

    // append empty frequency templates
    if(data.frequencyNodeCount){
      var $frequencies = $('.frequencies');

      // make the templates and append
      for(var i=0; i<Number(data.frequencyNodeCount); i++){
        var div = createFrequencyTemplate();
        $frequencies.append(div);
      }

      // assigne frequency dom elements to static container
      $('#channel-left').find('.frequency-wrapper').forEach(function(el){
        $(el).width((1/data.frequencyNodeCount)*100 + '%');

        $el.channels.left.frequencies.push({
          el    : $(el),
          val   : $(el).find('.frequency-val'),
          meter : $(el).find('.frequency')
        });
      });

      $('#channel-right').find('.frequency-wrapper').forEach(function(el){
        $(el).width((1/data.frequencyNodeCount)*100 + '%');

        $el.channels.right.frequencies.push({
          el    : $(el),
          val   : $(el).find('.frequency-val'),
          meter : $(el).find('.frequency')
        });
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
    // update the volume bar
    var volumeHeight = Math.round(data.volume/Utils.config.sensitivity);
    if(volumeHeight > 100) volumeHeight = 100;
    $el.channels[side].volume[0].style.height = volumeHeight + '%';

    // update the frequency bars and values
    data.frequency.forEach(function(frequency, i){
      var height = Math.round(frequency/Utils.config.sensitivity);
      if(height > 100) height = 100;
      $el.channels[side].frequencies[i].meter[0].style.height = height + '%';
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
        '<div class="frequency-container">',
          '<div class="frequency"></div>',
        '</div>',
      '</div>'
    ].join('');
  };
})();
