class Game {

  constructor(opts){
    var self = this;

    // class properties
    this.obstacleConfig = opts.obstacleConfig;
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
    self.game.load.image('paper', './img/paper.png');
    self.game.load.spritesheet('rocket', './img/rocket-sprite.png', 215, 479);

    // preload all the obstacle images
    self.obstacleConfig.forEach(function(config){
      var path = './img/' + config + '.png';
      self.game.load.image(config, path, config.width, config.height);
    });
  }


  create(self, opts){
    // setup world bounds and physics system
    self.game.add.tileSprite(0, 0, opts.width, opts.height*5, 'paper');
    self.game.world.setBounds(0, 0, opts.width, opts.height*5);
    self.game.physics.startSystem(Phaser.Physics.P2JS);
    self.game.physics.p2.restitution = 0.5;

    // create an obstacle container and setup hit detection
    self.obstacles = self.game.add.group();
    self.obstacles.enableBody = true;
    self.obstacles.physicsBodyType = Phaser.Physics.P2JS;

    // place some random obstacles
    for (var i = 0; i < opts.obstacleCount; i++)
    {
      var index = Utils.random(0, self.obstacleConfig.length - 1);
      var config = self.obstacleConfig[index];

      var obstacle = new Obstacle({
        context : self,
        config : config
      });
    }

    // setup player sprite
    self.player = new Player({ game : self.game });
    self.game.camera.follow(self.player.sprite);
  }


  update(self){
    self.player.update(self.volume);
  }


  addScore(){
    this.score += 1;
    this.$.score.textContent = this.score;
  }
}
