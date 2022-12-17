class Spaceship {
  constructor(ctx) {
    this.ctx = ctx
    this.x = 160
    this.y = 500
    this.w = 70
    this.h = 80
    this.vx = 0
    this.vy = 0
    
    this.img = new Image()
    this.img.src = "../resources/img/spaceship1.png"

    this.weapon = new Weapon(this)
  }

  draw() {
    this.ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.img.width / 7,
      this.img.height / 7
    )
    this.weapon.draw()
  }

  move() {
    this.x += this.vx
    this.y += this.vy 

    if(this.y <= 0) {
      this.y = 0
      this.vy = 0
    }

    if(this.y + this.h >= this.ctx.canvas.height) {
      this.y = this.ctx.canvas.height - this.h
      this.vy = 0
    }

    if (this.x <= 0) {
      this.x = 0
      this.vx = 0
    }

    if (this.x + this.w >= this.ctx.canvas.width) {
      this.x = this.ctx.canvas.width - this.w
      this.vx = 0
    }
    this.weapon.move()
  }

  onKeyDown(key) {
    switch(key) {
      case RIGHT: 
        this.vx = 3
        break
      case LEFT: 
        this.vx = -3
        break
      case UP: 
        this.vy = -3
        break
      case DOWN: 
        this.vy = 3
        break
      case SPACE:
        this.weapon.shoot()
        break
    }
  }
  
  onKeyUp(key) {
    switch(key) {
      case RIGHT: 
      case LEFT:
        this.vx = 0
        break
      case UP:
      case DOWN:
        this.vy = 0
        break
    }
  }
}