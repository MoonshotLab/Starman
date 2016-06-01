class Game {

  constructor(opts){
    var self = this;

    // class properties
    this.score = 0;
    this.obstacles = null;
    this.player = null;
    this.volume = { left : 0, right : 0 };

    // dom storage
    this.$ = {
      score : document.getElementById('score')
    };

    // create a new instance of a phaser game
    this.game = new Phaser.Game(
      opts.width, opts.height, Phaser.CANVAS, 'game',
      {
        preload: function() {
          self.preload(self, opts);
        },
        create: function() {
          self.create(self, opts);
        },
        update: function() {
          self.update(self, opts);
        }
      }
    );
  }


  preload(self){
    self.game.load.image('obstacle', './img/obstacle.png', 20, 20);
    self.game.load.spritesheet('rocket', './img/rocket-sprite.png', 215, 479);
  }


  create(self){
    self.game.stage.backgroundColor = '#eaeaea';
    self.game.physics.startSystem(Phaser.Physics.ARCADE);

    // setup player sprite
    self.player = new Player({ game : self.game });

    // create an obstacle container and setup hit detection
    self.obstacles = self.game.add.group();
    self.obstacles.enableBody = true;
    self.game.physics.enable(self.obstacles);

    // recursively generate obstacles
    self.generateObstacle(self);
  }


  update(self){
    self.player.update(self.volume);

    // do hit detections
    self.game.physics.arcade.collide(self.obstacles);
    self.game.physics.arcade.collide(self.player.sprite, self.obstacles, function(){
      console.log('collision');
    });

    // clean up obstacles if they're off stage
    self.obstacles.children.forEach(function(obstacle) {
      obstacle.controller.checkDone();
    });
  }



  generateObstacle(context, timeout){
    if (!timeout) timeout = 2000;

    var speed = (2000 - timeout * 0.95) + 10;

    timeout -= 20;
    if (timeout < 100) timeout = 100;

    var obstacle = new Obstacle({
      context : context,
      speed : -1 * speed
    });

    setTimeout(function() {
      context.generateObstacle(context, timeout);
    }, timeout);
  }



  addScore(){
    this.score += 1;
    this.$.score.textContent = this.score;
  }
}
