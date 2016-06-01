class Player {

  constructor(opts){
    // setup sprite
    this.sprite = opts.game.add.sprite(opts.game.width/2, opts.game.height, 'rocket');

    this.sprite.scale.setTo(0.4, 0.4);
    this.sprite.animations.add('no-boosters', [0], 1, false);
    this.sprite.animations.add('left-booster', [2], 1, false);
    this.sprite.animations.add('right-booster', [1], 1, false);
    this.sprite.animations.add('both-boosters', [3], 1, false);

    opts.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.bounce.setTo(0.75, 0.25);

    return this;
  }


  update(volume){
    // determine the horizontal speed of the rocket
    var speed = volume.right - volume.left;
    this.sprite.body.acceleration.x = speed;

    // play the proper sprite
    if(volume.right && volume.light){
      this.sprite.animations.play('both-boosters');
    } else if(volume.right){
      this.sprite.animations.play('left-booster');
    } else if(volume.left){
      this.sprite.animations.play('right-booster');
    } else{
      this.sprite.animations.play('no-boosters');
    }

    // rotate
    this.sprite.angle = speed/4;
  }
}
