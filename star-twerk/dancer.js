class Dancer{
  constructor(){
    this.$el = document.getElementById('dancer');
    this.$el.play();
    this.$queue = $('#queue-container');
  }


  pause(){
    this.$el.pause();
  }


  fail(){
    this.$el.pause();
    this.$queue.addClass('miss');

    var self = this;
    setTimeout(function(){
      self.$queue.removeClass('miss');
      self.$el.play();
    }, 250);
  }
}
