class Bullet {
  constructor(ctx, x, y) {
    this.ctx = ctx
    this.x = x
    this.y = y
    this.vx = 0
    this.vy = 2

  this.img = new Image()
  this.img.src = "assets/resources/images/bullet1.png"
  }

  draw() {
    this.img,
    0,
    0,
    this.img.width,
    this.img.height,
    this.x,
    this.y,
    this.w,
    this.h
  }

  move() {
    this.y += this.vy
  }

  isVisibile() {
    return (
      this.y > 0  && 
      this.y < this.ctx.canvas.height
    )
  }

}