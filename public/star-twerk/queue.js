class Queue{
  constructor(opts){
    this.$el = $('#queue');
    this.items = [];
    this.bpm = opts.bpm;

    var $now = $('#now');
    this.threshold = {
      top : 100 - Math.round((parseFloat($now.css('top')) / $now.parent().height()) * 100),
      bottom : Math.round((parseFloat($now.css('bottom')) / $now.parent().height())*100)
    };
  }


  addMove(tone){

    // generate a random color
    var color = [
      'rgb(',
        Utils.random(0, 255), ',',
        Utils.random(0, 255), ',',
        Utils.random(0, 255),
      ')'
    ].join('');

    // generate some random positional attributes
    var position = 100;

    // create the move element
    var $move = $('<div />', {
      class : 'move', css : {
        bottom : position + '%',
        backgroundColor : color
      }
    });

    // append to dom
    this.$el.append($move);

    // get the height
    var height = parseFloat($move.height()/$move.parent().height())*100;

    // remember in queue array
    this.items.push({
      $el     : $move,    // the dom element
      height  : height,   // the height of the dom element
      pos     : position, // the y position from bottom
      active  : false,    // is within the active zone
      tone    : tone,     // the tone this item represents
      passed  : false,    // has passed the tone test
      createdAt : Date.now()
    });
  }


  animate(now){
    var self = this;

    this.items.forEach(function(item, i){

      // set the position of each item
      var diff = (now - item.createdAt)/1000;
      diff = diff*self.bpm/60;
      item.pos = 100 - ((100 - item.height)*diff);
      item.$el.css('bottom', item.pos + '%');

      // if the item has passed the tone test
      if(item.passed){
        item.$el.addClass('passed');
      }

      // check for collision
      var a = item.pos - self.threshold.top;
      var b = item.pos + item.height - self.threshold.bottom;

      if(a < 0 && b > 0){
        item.$el.css('opacity', 1);
        item.active = true;
      } else{
        item.$el.css('opacity', 0.25);
        item.active = false;
      }

      // remove the element if it's off screen
      if(item.pos + item.height < 0) {
        item.$el.remove();
        self.items.splice(i, 1);
      }
    });
  }


  compareTone(tone){
    var passed = false;

    this.items.forEach(function(item){
      if(item.active === true &&
         item.passed === false &&
         item.tone   ==  tone){
        item.passed = true;
        passed = true;
      }
    });

    return passed;
  }
}
