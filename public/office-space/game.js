class Game {

  constructor(opts){
    var self = this;

    // class properties
    this.obstacleMap = opts.obstacleMap;
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
    self.game.load.spritesheet('rocket', './img/rocket-sprite.png', 250, 457);

    // preload all the obstacle images
    self.obstacleMap.forEach(function(obstacle){
      var path = './img/obstacles/' + obstacle.name + '.png';
      self.game.load.image(obstacle.name, path);
    });
  }


  create(self, opts){
    // setup background, world bounds and physics system
    var background = self.game.add.tileSprite(0, 0, opts.width, opts.height*5, 'background');
    background.fixedToCamera = true;
    self.game.world.setBounds(0, 0, opts.width, opts.height*7);
    self.game.physics.startSystem(Phaser.Physics.P2JS);
    self.game.physics.p2.restitution = 0.5;

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
    window.player = self.player;
  }


  update(self){
    // update player position and rotation
    self.player.update(self.volume);

    // follow player with camera
    var playerSprite = self.player.sprite;
    self.game.camera.focusOnXY(
      playerSprite.x - 150, playerSprite.y - 150
    );
  }


  addScore(){
    this.score += 1;
    this.$.score.textContent = this.score;
  }
}
