class Heart {
  constructor(ctx) {
    this.ctx = ctx
    this.w = 50
    this.x = Math.floor(Math.random() * (canvas.width - this.w))
    this.y = -150
    this.h = 40
    this.vx = 0
    this.vy = 1.2

    this.img = new Image()
    this.img.src = "assets/resources/images/heart.png"
    this.img.frames = 4
    this.img.frameIndex = 0
    this.tick = 0
  }

  draw() {
    this.ctx.imageSmoothingEnabled = false
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

  animate() {
    this.tick++

    if(this.tick > 30) {
      this.tick = 0
      this.img.frameIndex++

      if (this.img.frameIndex > this.img.frames - 1) {
        this.img.frameIndex = 0
      }
    }
  }

  collidesWith(bullet) {
    return (
      (bullet.x + bullet.w) >= this.x && 
      bullet.x <= (this.x + this.w) &&
      bullet.y <= (this.y + this.h) && 
      (bullet.y + bullet.h) >= this.y
    )
  }

  // collidesWith(spaceship) {
  //   return (
  //     (spaceship.x + spaceship.w) >= this.x && 
  //     spaceship.x <= (this.x + this.w) &&
  //     spaceship.y <= (this.y + this.h) && 
  //     (spaceship.y + spaceship.h) >= this.y
  //   )
  // }

  isVisible() {
    return (
      this.y < this.ctx.canvas.height &&
      this.y > 0 - (this.ctx.canvas.height)
    )
  }






}