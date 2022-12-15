class Game {
  constructor(ctx) {
    this.ctx = ctx
    this.interval = null
    this.background = new Background(ctx)
  }

  start() {
    this.interval = setInterval(() => {
      this.clear()
      this.draw()
      this.move()
    }, 1000 / 60)
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
  }

  move() {
  this.background.move()
  }

  stop() {
    clearInterval(this.interval)
  }
}