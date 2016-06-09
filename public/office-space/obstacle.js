class Obstacle {

  constructor(opts){
    this.context = opts.context;

    // place the sprite
    var w = this.context.game.world.width;
    var h = this.context.game.world.height;
    var x = 0;
    var y = 0;

    // set the x position with a little bit of randomness
    if(opts.config.x == -1)
      x = Utils.random(0, w/3);
    else if(opts.config.x == 1)
      x = Utils.random(w*0.66, w);
    else
      x = Utils.random(w/3, w*0.66);

    // set the y position with a little bit of randomness
    var fixedY = h*(opts.config.y/100);
    var randomY = h*0.05;
    y = Utils.random(fixedY - randomY, fixedY + randomY);

    this.sprite = new Phaser.Sprite(
      opts.context.game, x, y, opts.config.name
    );
    this.sprite.scale.setTo(0.3, 0.3);

    // add this sprite to the group
    opts.context.obstacles.add(this.sprite);

    // rotate dat
    this.sprite.body.angle = Utils.random(0, 360);

    return this;
  }
}
