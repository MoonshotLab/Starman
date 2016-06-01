class Obstacle {

  constructor(opts){
    this.context = opts.context;

    var y = -20;
    var x = Utils.random(0, opts.context.game.width);

    this.sprite = new Phaser.Sprite(opts.context.game, x, y,
      'obstacle');

    opts.context.obstacles.add(this.sprite);

    this.sprite.body.gravity.y = 50;
    this.sprite.body.bounce.setTo(1, 0.25);
    this.sprite.scale.setTo(3, 3);
    this.sprite.body.velocity.y = -1*opts.speed;
    this.sprite.controller = this;

    return this;
  }


  checkDone(){
    if(this.sprite.y > this.context.game.height) {
      this.sprite.controller.context.addScore();
      this.sprite.destroy();
      delete this.sprite.controller;
    }
  }
}
