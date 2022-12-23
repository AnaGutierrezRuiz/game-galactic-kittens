class Kitten {
  constructor(ctx, vy) {
    this.ctx = ctx
    this.w = 50
    this.x = Math.floor(Math.random() * (canvas.width - this.w))
    this.y = -150
    this.h= 50
    this.vx= 0
    this.vy = vy
    
    this.img = new Image()
    this.img.src = "assets/resources/images/kittensedited.png"
    this.img.frames = 7
    this.img.frameIndex = Math.floor(Math.random() * 7)
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
  
    collidesWith(bullet) {
      return (
        (bullet.x + bullet.w) >= this.x && 
        bullet.x <= (this.x + this.w) &&
        bullet.y <= (this.y + this.h) && 
        (bullet.y + bullet.h) >= this.y
      )
    }

    isVisible() {
      return (
        this.y < this.ctx.canvas.height &&
        this.y > 0 - (this.ctx.canvas.height)
      )
    }
  }
