class Game {
  constructor(ctx) {
    this.ctx = ctx
    this.interval = null
    this.tick = 0
    this.background = new Background(ctx)
    this.spaceship = new Spaceship(ctx)
    this.kittens = []
    this.bullets = []
  }

  start() {
    this.interval = setInterval(() => {
      this.clear()
      this.initListeners()
      this.draw()
      this.checkCollisions()
      this.move()
      this.addKitten()
      this.clearKittens()

      if (this.tick++ > 10000) {
        this.tick = 0
      }
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
    this.kittens.forEach(kitten => kitten.draw())
  }

  move() {
  this.background.move()
  this.spaceship.move()
  this.kittens.forEach(kitten => kitten.move())
  }

  checkCollisions() {
      const collisions = this.kittens.some(kitten => {
        const colX = ((this.spaceship.x + this.spaceship.w) >= kitten.x) && (this.spaceship.x <= (kitten.x + kitten.w))
        const colY = (this.spaceship.y <= (kitten.y + kitten.h)) && ((this.spaceship.y + this.spaceship.h) >= kitten.y)
        return colX && colY
       })
    if (collisions) {
      this.gameOver()
    }
  }

  clearKittens() {
    this.kittens = this.kittens.filter(kitten => kitten.isVisible())
  }

  addKitten() {
    if (this.tick % 100) return 
    this.kittens.push(new Kitten(this.ctx))
  }

  stop() {
    clearInterval(this.interval)
  }

  gameOver() {
    this.stop()
  }
}