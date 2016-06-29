class Game {

  constructor(opts){
    var self = this;

    // class properties
    this.emitter = new EventEmitter();
    this.obstacleMap = opts.obstacleMap;
    this.score = 0;
    this.obstacles = null;
    this.player = null;
    this.volume = 0;

    // dom storage
    this.$ = {
      score : document.getElementById('score')
    };

    // create a new instance of a phaser game
    this.game = new Phaser.Game(
      opts.width, opts.height, Phaser.CANVAS, 'game',
      {
        preload: function() {
          self.preload(self);
        },
        create: function() {
          self.create(self, opts);
        },
        update: function() {
          self.update(self);
        }
      }
    );
  }


  preload(self){
    self.game.load.image('background', './img/background.jpg');
    self.game.load.image('parallax', './img/parallax-background.png');
    self.game.load.spritesheet('rocket', './img/rocket-sprite.png', 250, 457);

    // preload all the obstacle images
    self.obstacleMap.forEach(function(obstacle){
      var path = './img/obstacles/' + obstacle.name + '.png';
      self.game.load.image(obstacle.name, path);
    });
  }


  create(self, opts){
    var worlScaleFactor = 20;

    // setup background, world bounds and physics system
    var background = self.game.add.tileSprite(0, 0, opts.width*worlScaleFactor, opts.height, 'background');
    background.fixedToCamera = true;

    self.parallax = self.game.add.tileSprite(0, 0, opts.width*worlScaleFactor, opts.height, 'parallax');
    self.parallax.fixedToCamera = true;

    self.game.world.setBounds(0, 0, opts.width*worlScaleFactor, opts.height);
    self.game.physics.startSystem(Phaser.Physics.P2JS);
    self.game.physics.p2.restitution = 0.25;
    self.game.physics.p2.gravity.y = 300;

    // create an obstacle container and setup hit detection
    self.obstacles = self.game.add.group();
    self.obstacles.enableBody = true;
    self.obstacles.physicsBodyType = Phaser.Physics.P2JS;

    // place some obstacles on the map
    opts.obstacleMap.forEach(function(obstacle){
      new Obstacle({ context : self, config : obstacle });
    });

    // don't allow obstacles to bounce against each other
    self.game.physics.p2.setPostBroadphaseCallback(function(body1, body2){
      if(body1.sprite.parent.name == body2.sprite.parent.name){
        return false;
      } else return true;
    }, this);

    // setup player sprite
    self.player = new Player({ game : self.game });
  }


  update(self){
    // parallax the background
    self.parallax.tilePosition.set(-self.game.camera.x/3, -self.game.camera.y/3);

    var playerSprite = self.player.sprite;
    if(playerSprite.x <= self.game.world.width - playerSprite.width){
      // update player position and rotation
      self.player.update(self.volume);
    } else{
      // stop moving!
      self.player.stop();
      self.game.paused = true;
      self.emitter.emitEvent('done', []);
    }

    // follow player with camera
    self.game.camera.focusOnXY(
      playerSprite.x, playerSprite.y - playerSprite.height/2
    );
  }
}
