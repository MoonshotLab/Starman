class Obstacle {

  constructor(opts){
    this.context = opts.context;

    // place the sprite
    var y = this.context.game.world.randomY;
    var x = this.context.game.world.randomX;
    this.sprite = new Phaser.Sprite(
      opts.context.game, x, y, opts.config
    );

    // add this sprite to the group
    opts.context.obstacles.add(this.sprite);

    // rotate dat
    this.sprite.body.angle = Utils.random(0, 360);

    return this;
  }
}
