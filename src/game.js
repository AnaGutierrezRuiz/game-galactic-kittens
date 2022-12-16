class Game {
  constructor(ctx) {
    this.ctx = ctx
    this.interval = null
    this.background = new Background(ctx)
    this.spaceship = new Spaceship(ctx)
    this.kitten = new Kitten(ctx)
  }

  start() {
    this.interval = setInterval(() => {
      this.clear()
      this.initListeners()
      this.draw()
      this.checkCollisions()
      this.move()
    }, 1000 / 60)
  }

  initListeners() {
    document.onkeydown = (e) => {
      this.spaceship.onKeyDown(e.keyCode)
    }

    document.onkeyup = (e) => {
      this.spaceship.onKeyUp(e.keyCode)
    }
  }

  clear() {
    this.ctx.clearRect(
      0,
      0,
    this.ctx.canvas.width,
    this.ctx.canvas.height 
    )
  }

  draw() {
    this.background.draw()
    this.spaceship.draw()
    this.kitten.draw()

  }

  move() {
  this.background.move()
  this.spaceship.move()
  this.kitten.move()
  }

  checkCollisions() {
    const colX = ((this.spaceship.x + this.spaceship.w) >= this.kitten.x) && (this.spaceship.x <= (this.kitten.x + this.kitten.w))
    const colY = (this.spaceship.y <= (this.kitten.y + this.kitten.h)) && ((this.spaceship.y + this.spaceship.h) >= this.kitten.y)
    if (colX && colY) {
      this.gameOver()
    }  
  }


  stop() {
    clearInterval(this.interval)
  }

  gameOver() {
    this.stop()
  }
}