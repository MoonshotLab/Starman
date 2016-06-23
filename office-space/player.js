class Player {

  constructor(opts){
    // setup and position sprite
    var x = 400;
    var y = opts.game.world.bounds.height - 300;
    this.sprite = opts.game.add.sprite(x, y, 'rocket');
    this.sprite.scale.setTo(0.7, 0.7);

    // setup animations
    this.sprite.animations.add('no-boosters', [0], 1, false);
    this.sprite.animations.add('left-booster', [2], 1, false);
    this.sprite.animations.add('right-booster', [1], 1, false);
    this.sprite.animations.add('both-boosters', [3], 1, false);

    // setup physics
    opts.game.physics.p2.enable(this.sprite);
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.damping = 0.4;

    this.sprite.body.angle = 45;

    return this;
  }


  update(volume){
    // determine the horizontal speed of the rocket
    var speed = volume;
    var powered = true;

    // play the proper sprite
    if(volume > Starman.utils.config.loThreshold){
      this.sprite.animations.play('both-boosters');
      this.sprite.body.angle = 45;
    } else{
      this.sprite.animations.play('no-boosters');
      this.sprite.body.angle = 135;
      powered = false;
    }

    // thrust and rotate
    if(powered){
      this.sprite.body.thrust(speed*100);
    }
  }


  stop(){
    this.sprite.body.velocity.x = 0;
    this.sprite.body.velocity.y = 0;
  }
}
