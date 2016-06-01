class Game {

  constructor(opts){
    var self = this;

    // class properties
    this.score = 0;
    this.obstacles = null;
    this.player = null;
    this.leftVolume = 0;
    this.rightVolume = 0;

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
    self.player = self.game.add.sprite(self.game.width/2, self.game.height, 'rocket');
    self.player.scale.setTo(0.4, 0.4);
    self.player.animations.add('no-boosters', [0], 1, false);
    self.player.animations.add('left-booster', [2], 1, false);
    self.player.animations.add('right-booster', [1], 1, false);
    self.player.animations.add('both-boosters', [3], 1, false);

    // setup player collisions
    self.game.physics.enable(self.player, Phaser.Physics.ARCADE);
    self.player.body.collideWorldBounds = true;
    self.player.body.bounce.setTo(0.75, 0.25);

    // create an obstacle container and setup hit detection
    self.obstacles = self.game.add.group();
    self.obstacles.enableBody = true;
    self.game.physics.enable(self.obstacles);

    // recursively generate obstacles
    self.generateObstacle(self);
  }


  update(self){
    // determine the horizontal speed of the rocket
    var speed = self.rightVolume - self.leftVolume;
    self.player.body.acceleration.x = speed;

    // play the proper sprite
    if(self.rightVolume && self.leftVolume){
      self.player.animations.play('both-boosters');
    } else if(self.rightVolume){
      self.player.animations.play('left-booster');
    } else if(self.leftVolume){
      self.player.animations.play('right-booster');
    } else{
      self.player.animations.play('no-boosters');
    }

    // represent with angle
    self.player.angle = speed/4;

    // do hit detections
    self.game.physics.arcade.collide(self.obstacles);
    self.game.physics.arcade.collide(self.player, self.obstacles, function(){
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
