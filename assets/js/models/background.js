class Background {
  constructor(ctx) {
    this.ctx = ctx;
    this.w = ctx.canvas.width;
    this.h = ctx.canvas.height;
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 1;

    this.img = new Image();
    this.img.src = "assets/resources/images/background2.png";
  }

  // The background image is drawn twice in order to get an infinite background
  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    this.ctx.drawImage(this.img, this.x, this.y - this.h, this.w, this.h);
  }

  // When one of the backgrounds is no longer visible it is moved to the initial position to get that infinite background effect
  move() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.y >= this.h) {
      this.y = 0;
    }
  }
}
