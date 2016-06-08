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


  addBeat(tone){
    // create the beat element
    var $beat = $('<div />', {
      class : 'beat ' + tone, css : {
        bottom : '100%'
      }
    });

    // append to dom
    this.$el.append($beat);

    // get the height
    var height = parseFloat($beat.height()/$beat.parent().height())*100;

    // remember in queue array
    this.items.push({
      $el     : $beat,    // the dom element
      height  : height,   // the height of the dom element
      pos     : 100,      // the y position from bottom
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
      diff = diff*Utils.config.bpm/60;
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
