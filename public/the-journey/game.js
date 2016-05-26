class Game {

  constructor(opts){
    var self = this;

    // class properties
    this.score = 0;
    this.obstacles = null;
    this.player = null;
    this.volume = 0;

    // dom storage
    this.$ = {
      points : document.getElementById('points'),
      speed : document.getElementById('speed')
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
    self.game.load.image('player', './img/player.png', 100, 40);
  }


  create(self){
    self.game.physics.startSystem(Phaser.Physics.ARCADE);

    // setup player collisions
    self.player = self.game.add.sprite(100, 40, 'player');
    self.game.physics.enable(self.player, Phaser.Physics.ARCADE);
    self.player.body.collideWorldBounds = true;
    self.player.body.bounce.setTo(1, 1);
    self.player.body.gravity.y = 0;

    // create an obstacle container and setup hit detection
    self.obstacles = self.game.add.group();
    self.obstacles.enableBody = true;
    self.game.physics.enable(self.obstacles);

    // ground
    self.ground = self.game.add.sprite(0, 380, 'obstacle');
    self.game.physics.enable(self.ground);
    self.ground.body.immovable = true;
    self.ground.width = 800;

    self.generateObstacle(self);
  }


  update(self){
    self.player.body.acceleration.x = window.speed;

    // do hit detections
    self.game.physics.arcade.overlap(self.player, self.obstacles, self.obstacleCollision,
      null, self);
    self.game.physics.arcade.overlap(self.player, self.ground, self.groundCollision,
      null, self);

    // clean up obstacles if they're off stage
    self.obstacles.children.forEach(function(obstacle) {
      obstacle.controller.checkDone();
    });
  }


  generateObstacle(context, timeout){
    if (!timeout) timeout = 2000;

    var speed = (2000 - timeout * 0.9) + 50;
    this.$.speed.textContent = speed + ' px/sec';

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


  obstacleCollision(player, obstacle){
    var xImpact = obstacle.body.velocity.x * -(obstacle.body.bounce.x);
    xImpact += player.body.velocity.x*2;
    obstacle.body.velocity.x = xImpact;

    window.speed -= obstacle.body.velocity.x/4;
  }


  groundCollision(){
    console.log('ground collision');
  }


  addScore(){
    this.score += 1;
    this.$.points.textContent = this.score;
  }
}
