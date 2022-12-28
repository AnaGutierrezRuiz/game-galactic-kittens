class Bullet {
  constructor(ctx, x, y) {
    this.ctx = ctx
    this.x = x
    this.y = y
    this.w = 25
    this.h = 25
    this.vx = 0
    this.vy = -3

    this.img = new Image()
    this.img.src = "assets/resources/images/bullet1.png"
  }

  draw() {
    this.ctx.drawImage(
      this.img,
      0,
      0,
      this.img.width,
      this.img.height,
      this.x - 10,
      this.y - 20,
      this.w,
      this.h
    )
  }

  move() {
    this.y += this.vy
    this.x += this.vx
  }

  isVisible() {
    return (
      this.y > 0  && 
      this.y < this.ctx.canvas.height
    )
  }

}