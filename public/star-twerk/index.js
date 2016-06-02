// (function(){

  var $el = {
    queue : $('#queue')
  };

  var queue = [];

  var speed = 0;

  var addMoveToQueue = function(){
    var position = -10;
    var $move = $('<div />', {
      class : 'move', css : { top : position + '%' }
    });

    $el.queue.append($move);
    queue.push({
      $el : $move,
      pos : position
    });
  };

  var frame = function(){
    queue.forEach(function(item, i){

      // set the position
      item.pos += speed;
      item.$el.css('top', item.pos + '%');

      // remove the element if it's off screen
      if(item.pos >= 100) {
        item.$el.remove();
        queue.splice(i, 1);
      }
    });

    requestAnimationFrame(frame);
  };

  requestAnimationFrame(frame);
// })();
