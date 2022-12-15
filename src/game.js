class Game {
  constructor(ctx) {
    this.ctx = ctx
    this.interval = null
    this.background = new Background(ctx)
    this.spaceship = new Spaceship(ctx)
  }

  start() {
    this.interval = setInterval(() => {
      this.clear()
      this.initListeners()
      this.draw()
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
  }

  move() {
  this.background.move()
  this.spaceship.move()
  }

  stop() {
    clearInterval(this.interval)
  }
}