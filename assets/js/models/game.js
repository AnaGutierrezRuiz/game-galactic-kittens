class Game {
  constructor(ctx) {
    this.ctx = ctx
    this.interval = null
    this.tick = 0
    this.background = new Background(ctx)
    this.spaceship = new Spaceship(ctx)
    this.life = new Life(ctx)
    this.kittens = []

    this.music = new Audio("assets/resources/sounds/game-music1.mp3")
    this.music.volume = 0.5
    
    this.meowSound = new Audio("assets/resources/sounds/meow.mp3") 
    this.meowSound.volume = 0.5

    this.levelUpSound = new Audio("assets/resources/sounds/level-up.wav")
    this.levelUpSound.volume = 1
    
    this.score = 0
    this.level = 1

    this.gameOverImg = new Image
    this.gameOverImg.src = "assets/resources/images/game-over-vertical.png"
  }

  start() {
    this.interval = setInterval(() => {
      this.clear()
      this.initListeners()
      this.music.play()
      this.draw()
      this.checkShipCollisions()
      this.checkBulletsCollisions()
      this.move()
      this.addKitten()
      this.clearKittens()
      this.clearBullets()
      this.loseLife()

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
    this.life.draw()
    this.kittens.forEach(kitten => kitten.draw())
    this.drawScore()
    this.drawLevel()
  }

  move() {
  this.background.move()
  this.spaceship.move()
  this.kittens.forEach(kitten => kitten.move())
  }

  checkShipCollisions() {
      const collisions = this.kittens.some(kitten => {
        const colX = ((this.spaceship.x + this.spaceship.w) >= kitten.x) && (this.spaceship.x <= (kitten.x + kitten.w))
        const colY = (this.spaceship.y <= (kitten.y + kitten.h)) && ((this.spaceship.y + this.spaceship.h) >= kitten.y)
        return colX && colY
       })
    if (collisions) {
      this.gameOver()
    }
  }
//why cant i check both kittens and bullets arrays from here ( i ended up creating a method withing the kitten class)
  checkBulletsCollisions() {
    this.spaceship.bullets.forEach(bullet => {
      this.kittens.forEach(kitten => {
        if (kitten.collidesWith(bullet)){
          this.bulletCollidesWithKitten(kitten, bullet)
        }
      })
    })
  }

  loseLife() {
    this.kittens.forEach(kitten => {
      if (kitten.y >= 550) {
        this.life.img.frameIndex = 1
        let lifeDownSound = new Audio("assets/resources/sounds/life-down.wav")
        if (musicButton.classList.contains("on")) {
          lifeDownSound.volume = 0.1
          lifeDownSound.play() 
      }
      }
      if (this.life.img.frameIndex === 3) {
        this.gameOver();
      }
    })
    // setTimeout(() => {
    //   if (this.life.img.frameIndex === 4) {
    //     this.gameOver()
    //   }  
    // }, )
  }

  clearKittens() {
    this.kittens = this.kittens.filter(kitten => kitten.isVisible())
  }

  clearBullets() {
    this.spaceship.bullets = this.spaceship.bullets.filter(bullet => bullet.isVisible())
  }
  
  bulletCollidesWithKitten(kitten, bullet) {
    const kittenIndex = this.kittens.indexOf(kitten)
    this.kittens.splice(kittenIndex, 1)

    const bulletIndex = this.spaceship.bullets.indexOf(bullet)
    this.spaceship.bullets.splice(bulletIndex, 1)

    this.meowSound.play()
    //Score is increased with every kitten destroyed
    this.increaseScore()
    //Level is increased after 10 kittens destroyed. With each level kittens velocity is increased by 1. 
    if (this.score % 10 === 0) {
      this.levelUpSound.play()
      this.level++
      this.kittens.forEach(kitten => kitten.increaseKittensSpeed())
    }

  }

  increaseScore() {
    this.score++
  }

  addKitten() {
    if (this.tick % 100) return 
    this.kittens.push(new Kitten(this.ctx))
  }

  drawScore() {
    //this.ctx.fillStyle = "#FFA7E4" // this is the pink color of our title
    this.ctx.fillStyle = "#5BE1E6"
    this.ctx.font = "bolder 30px sans-serif"
    this.ctx.shadowColor = "#FFA7E4"
    //this.ctx.strokeText("Score: ", 30, 30, 70, 80)
    this.ctx.fillText(`Score: ${this.score}`, 20, 40, 110, 60)
  }

  drawLevel() {
    this.ctx.fillStyle = "#FFA7E4"
    this.ctx.fillText(`Level: ${this.level}`, 20, 70, 110, 60)
  }

  stop() {
      clearInterval(this.interval)
  }

  gameOver() {
      this.stop()
      const gameOverSound = new Audio("assets/resources/sounds/game-over.wav")
      if (musicButton.classList.contains("on")) {
        gameOverSound.play()
      }

      this.ctx.drawImage(
        this.gameOverImg, 
        0,
        0,
        this.ctx.canvas.width,
        this.ctx.canvas.height
      )

      this.ctx.font = "bolder 30px sans-serif"
      this.ctx.textAlign = "center"
      this.ctx.fillStyle = "#FFA7E4"
      this.ctx.fillText(
        `Final Score: ${this.score}`, 
        (this.ctx.canvas.width / 2), 
        450, 
        170, 
        80
        )
      this.ctx.fillStyle = "#5BE1E6"
      this.ctx.fillText(
          `Level: ${this.level}`, 
          (this.ctx.canvas.width / 2), 
          480, 
          170, 
          80
          )    
  }
}