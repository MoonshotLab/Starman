class Dancer{
  constructor(){
    this.$el = document.getElementById('dancer');
    this.$fail = document.getElementById('fail');
  }


  progress(){
    console.log('progress');
  }


  fail(){
    var self = this;
    this.$fail.className += 'show';
    setTimeout(function(){
      self.$fail.className = '';
    }, 250);
  }
}
