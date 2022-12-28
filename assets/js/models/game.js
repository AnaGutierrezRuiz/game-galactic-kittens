class Game {
  constructor(ctx) {
    this.ctx = ctx
    this.interval = null
    this.tick = 0
    this.background = new Background(ctx)
    this.spaceship = new Spaceship(ctx)
    this.life = new Life(ctx)
    this.kittens = []
    this.asteroids = []
    this.hearts = []

    this.gameIntroImg = new Image
    this.gameIntroImg.src = "assets/resources/images/game-intro-vertical.png"

    this.music = new Audio("assets/resources/sounds/game-music1.mp3")
    this.music.volume = 0.5

    this.meowSound = new Audio("assets/resources/sounds/meow.mp3")
    this.meowSound.volume = 0.5

    this.levelUpSound = new Audio("assets/resources/sounds/level-up.wav")
    this.levelUpSound.volume = 1

    this.heartUpSound1 = new Audio("assets/resources/sounds/1up-option1.wav")
    this.heartUpSound1.volume = 0.5

    this.heartUpSound2 = new Audio("assets/resources/sounds/1up-3.wav")
    this.heartUpSound2.volume = 0.2

    this.gameOverSound = new Audio("assets/resources/sounds/game-over.wav")
    this.gameOverSound.volume = 0.2

    this.score = 0
    this.level = 1

    this.gameOverImg = new Image
    this.gameOverImg.src = "assets/resources/images/game-over-vertical2.png"

    this.isIntroMenu = true;
  }

  gameIntro() {
    const introImg = document.getElementById("game-intro")
    introImg.classList.add("hidden")
    const spaceshipMenu1 = document.getElementById("ship-button1")
    spaceshipMenu1.classList.add("hidden")
    const spaceshipMenu2 = document.getElementById("ship-button2")
    spaceshipMenu2.classList.add("hidden")
    const spaceshipMenu3 = document.getElementById("ship-button3")
    spaceshipMenu3.classList.add("hidden")
    const spaceshipMenu4 = document.getElementById("ship-button4")
    spaceshipMenu4.classList.add("hidden")
    const gameCanvas = document.getElementById("game")
    gameCanvas.classList.remove("hidden")
    this.start()
    this.isIntroMenu = false
  
  }

  start() {
    this.interval = setInterval(() => {
      this.clear()
      this.music.play()
      this.draw()
      this.checkShipCollisions()
      this.checkBulletsCollisions()
      this.move()
      this.addKitten()
      this.addAsteroid()
      this.addHeart()
      this.clearKittens()
      this.clearAsteroids()
      this.clearBullets()
      this.clearHearts()
      this.loseLife()

      if (this.tick++ > 10000) {
        this.tick = 0
      }
    }, 1000 / 60)
  }

  initListeners() {
    document.onkeydown = (e) => {
      this.onKeyDown(e.keyCode)
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
    this.asteroids.forEach(asteroid => asteroid.draw())
    this.hearts.forEach(heart => heart.draw())
    this.hearts.forEach(heart => heart.animate())
    this.drawScore()
    this.drawLevel()
  }

  move() {
  this.background.move()
  this.spaceship.move()
  this.kittens.forEach(kitten => kitten.move())
  this.asteroids.forEach(asteroid => asteroid.move())
  this.hearts.forEach(heart => heart.move())

  }

  checkShipCollisions() {
    const collisionsWithKittens = this.kittens.some(kitten => {
      const colX1 = ((this.spaceship.x + this.spaceship.w) >= kitten.x) && (this.spaceship.x <= (kitten.x + kitten.w))
      const colY1 = (this.spaceship.y <= (kitten.y + kitten.h)) && ((this.spaceship.y + this.spaceship.h) >= kitten.y)
      return colX1 && colY1
    })
    if (collisionsWithKittens) {
      this.life.img.frameIndex = 3
      this.gameOver()
    }
    const collisionsWithAsteroids = this.asteroids.some(asteroid => {
      const colX2 = ((this.spaceship.x + this.spaceship.w) >= asteroid.x) && (this.spaceship.x <= (asteroid.x + asteroid.w))
      const colY2 = (this.spaceship.y <= (asteroid.y + asteroid.h)) && ((this.spaceship.y + this.spaceship.h) >= asteroid.y)
      return colX2 && colY2
    })
    if (collisionsWithAsteroids) {
      this.life.img.frameIndex = 3
      this.gameOver()
    }
    // const collisionsWithHearts = this.hearts.some(heart => {
    //   const colX3 = ((this.spaceship.x + this.spaceship.w) >= heart.x) && (this.spaceship.x <= (heart.x + heart.w))
    //   const colY3 = (this.spaceship.y <= (heart.y + heart.h)) && ((this.spaceship.y + this.spaceship.h) >= heart.y)
    //   return colX3 && colY3
    // })
    // if (collisionsWithHearts) {
    //   const heartIndex = this.hearts.indexOf(heart)
    //   this.hearts.splice(heartIndex, 1)
    // }
    // if (collisionsWithHearts && this.life.img.frameIndex > 0 && this.life.img.frameIndex < 3) {
    //   this.life.img.frameIndex -= 1      
    // }
  }

//why cant i check both kittens and bullets arrays from here ( i ended up creating a method withing the kitten class)
  checkBulletsCollisions() {
    this.spaceship.bullets.forEach(bullet => {
      this.kittens.forEach(kitten => {
        if (kitten.collidesWith(bullet)) {
          this.bulletCollidesWithKitten(kitten, bullet)
        }
      })
    })

    this.spaceship.bullets.forEach(bullet => {
      this.hearts.forEach(heart => {
        if (heart.collidesWith(bullet)) {
          this.bulletCollidesWithHeart(heart, bullet)
        }
      })
    })
  }

  loseLife() {

    this.kittens.forEach(kitten => {
      if (!kitten.isVisible()) {
        this.life.img.frameIndex++
        let lifeDownSound = new Audio("assets/resources/sounds/life-down.wav")
        if (musicButton.classList.contains("on")) {
          lifeDownSound.volume = 0.3
          lifeDownSound.play()
      }
      }
    })
    if (this.life.img.frameIndex === 3) {
      setTimeout(() => {
          this.gameOver()
      }, 300)
    }
  }

  clearKittens() {
    setTimeout(() => {
    this.kittens = this.kittens.filter(kitten => kitten.isVisible())
    }, 10)
  }

  clearBullets() {
    this.spaceship.bullets = this.spaceship.bullets.filter(bullet => bullet.isVisible())
  }

  clearAsteroids() {
    setTimeout(() => {
      this.asteroids = this.asteroids.filter(asteroid => asteroid.isVisible())
    }, 10)
  }

  clearHearts() {
    setTimeout(() => {
      this.hearts = this.hearts.filter(heart => heart.isVisible())
    }, 10)
  }

  bulletCollidesWithKitten(kitten, bullet) {
    const kittenIndex = this.kittens.indexOf(kitten)
    this.kittens.splice(kittenIndex, 1)

    const bulletIndex = this.spaceship.bullets.indexOf(bullet)
    this.spaceship.bullets.splice(bulletIndex, 1)

    this.meowSound.play()
    //Score is increased with every kitten destroyed
    this.increaseScore()
    //Level is increased after 10 kittens destroyed.
    if (this.score % 10 === 0) {
      this.levelUpSound.play()
      this.level++
    }

  }

  bulletCollidesWithHeart(heart, bullet) {
    const heartIndex = this.hearts.indexOf(heart)
    this.hearts.splice(heartIndex, 1)

    const bulletIndex = this.spaceship.bullets.indexOf(bullet)
    this.spaceship.bullets.splice(bulletIndex, 1)

    if (this.life.img.frameIndex > 0 && this.life.img.frameIndex < 3) {
      this.heartUpSound1.play()
      this.life.img.frameIndex -= 1      
    } else if (this.life.img.frameIndex === 0) {
      this.heartUpSound2.play()
    }
  }

  increaseScore() {
    this.score++
  }

  addKitten() {
    if (this.tick % 100) return
    //for each kitten its velocity is increased depending on the level the player is at
    //const vy = 2 + this.level * 0.3
    const vy = 2
    this.kittens.push(new Kitten(this.ctx, vy))
  }

  addAsteroid() {
    setTimeout (() => {
      if (this.tick % 350) return 
      this.asteroids.push(new Asteroid(this.ctx))
    }, 150)
    
  }

  addHeart() {
    setTimeout(() => {
      if (this.tick % 825) return
      this.hearts.push(new Heart(this.ctx))
    }, 825)
  }

  drawScore() {
    this.ctx.fillStyle = "#5BE1E6"
    this.ctx.font = "bolder 30px sans-serif"
    this.ctx.shadowColor = "#FFA7E4"
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

    if (musicButton.classList.contains("on")) {
      this.gameOverSound.play()
      this.music.pause()
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
      440,
      170,
      80
      )
    this.ctx.fillStyle = "#5BE1E6"
    this.ctx.fillText(
        `Level: ${this.level}`,
        (this.ctx.canvas.width / 2),
        470,
        170,
        80
        )
  }

  onKeyDown(key) {
    switch(key) {
      case ENTER:
        if(this.isIntroMenu) {
          this.gameIntro()
        } else {
          window.location.reload()
        }
      break
    }
  }
}