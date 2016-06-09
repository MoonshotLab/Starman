class Dancer{
  constructor(){
    this.$el = document.getElementById('dancer');
    this.$el.play();
    this.$fail = document.getElementById('fail');
  }


  pause(){
    this.$el.pause();
  }


  fail(){
    this.$el.pause();

    var self = this;
    this.$fail.className += 'show';
    setTimeout(function(){
      self.$fail.className = '';
      self.$el.play();
    }, 250);
  }
}
