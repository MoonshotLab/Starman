(function(){

  var $el = {
    score : document.getElementById('score'),
    intro : document.getElementById('intro'),
    outro : document.getElementById('outro'),
    gameplay : document.getElementById('gameplay')
  };


  // space bar to initialize
  document.onkeydown = function(e){
    if(e.keyCode == 32){
      $el.intro.play();
    }
  };


  // when video is done hide it and begin requesting animation frames
  $el.intro.addEventListener('ended', function(){
    $el.intro.style.display = 'none';
    $el.gameplay.style.display = 'block';

    var game = new Game();
    game.emitter.on('done', function(){
      $el.outro.style.display = 'block';
      setTimeout(function(){
        $el.gameplay.className = '';
        $el.outro.className = 'show';
        $el.outro.play();
      }, 100);
    });
  },false);

})();
