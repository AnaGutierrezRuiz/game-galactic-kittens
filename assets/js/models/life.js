class Life {
  constructor(ctx) {
    this.ctx = ctx
    this.x = 280
    this.y = 10
    this.w = 100
    this.h = 50
    
    this.img = new Image()
    this.img.src = "assets/resources/images/life.png"
    this.img.frames = 4
    this.img.frameIndex = 0
  }

  draw() {
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

}