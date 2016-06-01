class Player {

  constructor(opts){
    // setup and position sprite
    var x = opts.game.world.bounds.width/2;
    var y = opts.game.world.bounds.height;
    this.sprite = opts.game.add.sprite(x, y, 'rocket');
    this.sprite.scale.setTo(0.4, 0.4);

    // setup animations
    this.sprite.animations.add('no-boosters', [0], 1, false);
    this.sprite.animations.add('left-booster', [2], 1, false);
    this.sprite.animations.add('right-booster', [1], 1, false);
    this.sprite.animations.add('both-boosters', [3], 1, false);

    // setup physics
    opts.game.physics.p2.enable(this.sprite);
    this.sprite.body.collideWorldBounds = true;

    return this;
  }


  update(volume){
    // determine the horizontal speed of the rocket
    var speed = volume.right - volume.left;
    this.sprite.body.velocity.x = speed;
    this.sprite.body.velocity.y = -1*(volume.right + volume.left);

    // play the proper sprite
    if(volume.right && volume.left){
      this.sprite.animations.play('both-boosters');
    } else if(volume.right){
      this.sprite.animations.play('left-booster');
    } else if(volume.left){
      this.sprite.animations.play('right-booster');
    } else{
      this.sprite.animations.play('no-boosters');
    }

    // rotate
    this.sprite.body.angle = speed/4;
  }
}
