class Obstacle {

  constructor(opts){
    this.context = opts.context;

    // place the sprite
    var w = this.context.game.world.width;
    var h = this.context.game.world.height;
    var x = 0;
    var y = 0;

    // set the x position with a little bit of randomness
    if(opts.config.y == -1)
      y = Starman.utils.random(0, h/3);
    else if(opts.config.y == 1)
      y = Starman.utils.random(w*0.66, h);
    else
      y = Starman.utils.random(w/3, h*0.66);

    // set the y position with a little bit of randomness
    var fixedX = w*(opts.config.x/100);
    var randomX = w*0.05;
    x = Starman.utils.random(fixedX - randomX, fixedX + randomX);

    this.sprite = new Phaser.Sprite(
      opts.context.game, x, y, opts.config.name
    );
    this.sprite.scale.setTo(0.25, 0.25);

    // add this sprite to the group
    opts.context.obstacles.add(this.sprite);

    // give it some weight
    this.sprite.body.damping = 0.8;
    this.sprite.body.data.gravityScale = 0;

    return this;
  }
}
