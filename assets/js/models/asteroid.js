class Asteroid {
  constructor(ctx) {
    this.ctx = ctx
    this.w = 50
    this.x = Math.floor(Math.random() * (canvas.width - this.w))
    this.y = -150
    this.h = 50
    this.vx = 0
    this.vy = 2

    this.img = new Image()
    this.img.src = "assets/resources/images/asteroids.png"
    this.img.frames = 8
    this.img.frameIndex = Math.floor(Math.random() * 8)
    this.tick = 0
  }

  draw() {
    this.ctx.imagesSmoothingEnabled = false
    this.ctx.drawImage(
      this.img,
      this.img.frameIndex * this.img.width / this.img.frames,
      0,
      this.img.width / this.img.frames,
      this.img.height,
      this.x,
      this.y,
      this.w,
      this.h
    )
  }

    move() {
      this.x += this.vx
      this.y += this.vy
    }

    isVisible() {
      return (
        this.y < this.ctx.canvas.height &&
        this.y > 0 - (this.ctx.canvas.height)
      )
    }

  




}