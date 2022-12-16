class Kitten {
  constructor(ctx) {
    this.ctx = ctx
    this.x = 90
    this.y = -150
    this.w = 200
    this.h= 100
    this.vx= 0
    this.vy = 2
    
    this.img = new Image()
    this.img.src = "../resources/img/kittens.png"
    }

    draw() {
      this.ctx.drawImage(
        this.img,
        this.x,
        this.y,
        this.img.width / 2,
        this.img.height / 2
      )
    }
  
    move() {
      this.x += this.vx
      this.y += this.vy 

      if (this.y >= this.ctx.canvas.height + 10) {
        this.y = -100
      }
    }

  }
