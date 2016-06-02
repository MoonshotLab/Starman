class Queue{
  constructor(){
    this.$el = $('#queue');
    this.items = [];

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
    var height = Utils.random(5, 50);
    var left = Utils.random(0, 2);
    var position = 100;

    // create the move element
    var $move = $('<div />', {
      class : 'move', css : {
        bottom : position + '%',
        height : height + '%',
        backgroundColor : color,
        left : left*33.3 + '%',
      }
    });

    // append to dom and remember in queue array
    this.$el.append($move);
    this.items.push({
      $el     : $move,
      height  : height,
      pos     : position,
      active  : false,
      tone    : tone
    });
  }


  animate(speed){
    var self = this;

    this.items.forEach(function(item, i){

      // set the position of each item
      item.pos -= speed;
      item.$el.css('bottom', item.pos + '%');

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


  compareTone(tones){

  }
}
