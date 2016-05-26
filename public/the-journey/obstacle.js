class Obstacle {

  constructor(opts){
    this.context = opts.context;
    var y = 60;

    this.sprite = new Phaser.Sprite(opts.context.game, 800, y,
      'obstacle');

    opts.context.obstacles.add(this.sprite);

    this.sprite.body.bounce.x = 1;
    this.sprite.body.velocity.x = opts.speed;
    this.sprite.body.immovable = true;
    this.sprite.controller = this;

    return this;
  }


  checkDone(){
    if(this.sprite.x < 0) {
      this.sprite.controller.context.addScore();
      this.sprite.destroy();
      delete this.sprite.controller;
    }
  }
}
