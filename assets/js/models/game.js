class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.interval = null;
    this.tick = 0;
    this.background = new Background(ctx);
    this.spaceship = new Spaceship(ctx);
    this.life = new Life(ctx);
    this.kittens = [];
    this.asteroids = [];
    this.hearts = [];

    this.gameIntroImg = new Image();
    this.gameIntroImg.src = "assets/resources/images/game-intro.png";

    this.music = new Audio("assets/resources/sounds/game-music.mp3");
    this.music.volume = 0.1;
    this.music.loop = true;

    this.meowSound = new Audio("assets/resources/sounds/meow.mp3");
    this.meowSound.volume = 0.1;

    this.levelUpSound = new Audio("assets/resources/sounds/level-up.wav");
    this.levelUpSound.volume = 0.2;

    //Sound played when the player shoots a heart and gets 1 up (only if their life is not full)
    this.heartUpSound1 = new Audio("assets/resources/sounds/heart-sound-life-up.wav");
    this.heartUpSound1.volume = 0.1;

    //Sound played when the player shoots a heart but they get nothing since their life is already full 
    this.heartUpSound2 = new Audio("assets/resources/sounds/heart-sound-life-still.wav");
    this.heartUpSound2.volume = 0.1;

    this.gameOverSound = new Audio("assets/resources/sounds/game-over.wav");
    this.gameOverSound.volume = 0.1;

    this.score = 0;
    this.level = 1;

    this.gameOverImg = new Image();
    this.gameOverImg.src = "assets/resources/images/game-over.png";

    this.isIntroMenu = true;
    this.isGameOn = false;
  }

  gameIntro() {
    const introImg = document.getElementById("game-intro");
    introImg.classList.add("hidden");
    const spaceship1Menu = document.getElementById("spaceship-button1");
    spaceship1Menu.classList.add("hidden");
    const spaceship2Menu = document.getElementById("spaceship-button2");
    spaceship2Menu.classList.add("hidden");
    const spaceship3Menu = document.getElementById("spaceship-button3");
    spaceship3Menu.classList.add("hidden");
    const spaceship4Menu = document.getElementById("spaceship-button4");
    spaceship4Menu.classList.add("hidden");
    const gameCanvas = document.getElementById("game");
    gameCanvas.classList.remove("hidden");
    this.start();
    this.isIntroMenu = false;
    this.isGameOn = true;
  }

  start() {
    this.interval = setInterval(() => {
      this.clear();
      this.music.play();
      this.draw();
      this.checkSpaceshipCollisions();
      this.checkBulletsCollisions();
      this.move();
      this.addKitten();
      this.addAsteroid();
      this.addHeart();
      this.clearKittens();
      this.clearAsteroids();
      this.clearBullets();
      this.clearHearts();
      this.loseLife();

      if (this.tick++ > 10000) {
        this.tick = 0;
      }
    }, 1000 / 60);
  }

  initListeners() {
    document.onkeydown = (e) => {
      this.onKeyDown(e.keyCode);
      this.spaceship.onKeyDown(e.keyCode);
    };

    document.onkeyup = (e) => {
      this.spaceship.onKeyUp(e.keyCode);
    };
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  draw() {
    this.background.draw();
    this.hearts.forEach((heart) => heart.draw());
    this.hearts.forEach((heart) => heart.animate());
    this.kittens.forEach((kitten) => kitten.draw());
    this.asteroids.forEach((asteroid) => asteroid.draw());
    this.spaceship.draw();
    this.life.draw();
    this.drawScore();
    this.drawLevel();
  }

  move() {
    this.background.move();
    this.spaceship.move();
    this.kittens.forEach((kitten) => kitten.move());
    this.asteroids.forEach((asteroid) => asteroid.move());
    this.hearts.forEach((heart) => heart.move());
  }

  checkSpaceshipCollisions() {
    const collisionsWithKittens = this.kittens.some((kitten) => {
      const colX1 =
        this.spaceship.x + this.spaceship.w >= kitten.x &&
        this.spaceship.x <= kitten.x + kitten.w;
      const colY1 =
        this.spaceship.y <= kitten.y + kitten.h &&
        this.spaceship.y + this.spaceship.h >= kitten.y;
      return colX1 && colY1;
    });
    if (collisionsWithKittens) {
      this.life.img.frameIndex = 3;
      this.gameOver();
    }
    const collisionsWithAsteroids = this.asteroids.some((asteroid) => {
      const colX2 =
        this.spaceship.x + this.spaceship.w >= asteroid.x &&
        this.spaceship.x <= asteroid.x + asteroid.w;
      const colY2 =
        this.spaceship.y <= asteroid.y + asteroid.h &&
        this.spaceship.y + this.spaceship.h >= asteroid.y;
      return colX2 && colY2;
    });
    if (collisionsWithAsteroids) {
      this.life.img.frameIndex = 3;
      this.gameOver();
    }
  }

  checkBulletsCollisions() {
    this.spaceship.bullets.forEach((bullet) => {
      this.kittens.forEach((kitten) => {
        if (kitten.collidesWith(bullet)) {
          this.bulletCollidesWithKitten(kitten, bullet);
        }
      });
    });

    this.spaceship.bullets.forEach((bullet) => {
      this.hearts.forEach((heart) => {
        if (heart.collidesWith(bullet)) {
          this.bulletCollidesWithHeart(heart, bullet);
        }
      });
    });
  }

  loseLife() {
    this.kittens.forEach((kitten) => {
      if (!kitten.isVisible()) {
        this.life.img.frameIndex++;
        let lifeDownSound = new Audio("assets/resources/sounds/life-down.wav");
        if (musicButton.classList.contains("on")) {
          lifeDownSound.volume = 0.1;
          lifeDownSound.play();
        }
      }
    });
    if (this.life.img.frameIndex === 3) {
      setTimeout(() => {
        this.gameOver();
      }, 300);
    }
  }

  clearKittens() {
    setTimeout(() => {
      this.kittens = this.kittens.filter((kitten) => kitten.isVisible());
    }, 10);
  }

  clearBullets() {
    this.spaceship.bullets = this.spaceship.bullets.filter((bullet) =>
      bullet.isVisible()
    );
  }

  clearAsteroids() {
    setTimeout(() => {
      this.asteroids = this.asteroids.filter((asteroid) =>
        asteroid.isVisible()
      );
    }, 10);
  }

  clearHearts() {
    setTimeout(() => {
      this.hearts = this.hearts.filter((heart) => heart.isVisible());
    }, 10);
  }

  bulletCollidesWithKitten(kitten, bullet) {
    const kittenIndex = this.kittens.indexOf(kitten);
    this.kittens.splice(kittenIndex, 1);

    const bulletIndex = this.spaceship.bullets.indexOf(bullet);
    this.spaceship.bullets.splice(bulletIndex, 1);

    this.meowSound.play();
    //Score is increased with every kitten destroyed
    this.increaseScore();
    //Level is increased after 10 kittens destroyed
    if (this.score % 10 === 0) {
      this.levelUpSound.play();
      this.level++;
    }
  }

  bulletCollidesWithHeart(heart, bullet) {
    const heartIndex = this.hearts.indexOf(heart);
    this.hearts.splice(heartIndex, 1);

    const bulletIndex = this.spaceship.bullets.indexOf(bullet);
    this.spaceship.bullets.splice(bulletIndex, 1);

    if (this.life.img.frameIndex > 0 && this.life.img.frameIndex < 3) {
      this.heartUpSound1.play();
      this.life.img.frameIndex -= 1;
    } else if (this.life.img.frameIndex === 0) {
      this.heartUpSound2.play();
    }
  }

  increaseScore() {
    this.score++;
  }

  addKitten() {
    if (this.tick % 100) return;
    let vy = this.level + 0.3;
    this.kittens.push(new Kitten(this.ctx, vy));
  }

  addAsteroid() {
    setTimeout(() => {
      if (this.tick % 350) return;
      this.asteroids.push(new Asteroid(this.ctx));
    }, 150);
  }

  addHeart() {
    setTimeout(() => {
      if (this.tick % 825) return;
      this.hearts.push(new Heart(this.ctx));
    }, 1025);
  }

  drawScore() {
    this.ctx.fillStyle = "#5BE1E6";
    this.ctx.font = "bolder 30px sans-serif";
    this.ctx.shadowColor = "#FFA7E4";
    this.ctx.fillText(`Score: ${this.score}`, 20, 40, 110, 60);
  }

  drawLevel() {
    this.ctx.fillStyle = "#FFA7E4";
    this.ctx.fillText(`Level: ${this.level}`, 20, 70, 110, 60);
  }

  stop() {
    clearInterval(this.interval);
  }

  gameOver() {
    this.stop();
    this.showScoresButton();
    this.isGameOn = false;

    if (musicButton.classList.contains("on")) {
      this.gameOverSound.play();
      this.music.pause();
    }

    this.ctx.drawImage(
      this.gameOverImg,
      0,
      0,
      this.ctx.canvas.width,
      this.ctx.canvas.height
    );

    this.ctx.font = "bolder 25px sans-serif";
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "#FFA7E4";
    this.ctx.fillText(
      `Final Score: ${this.score}`,
      this.ctx.canvas.width / 2,
      415,
      170,
      80
    );
    this.ctx.fillStyle = "#5BE1E6";
    this.ctx.fillText(
      `Level: ${this.level}`,
      this.ctx.canvas.width / 2,
      440,
      170,
      80
    );
  }

  showScoresButton() {
    const scoresForm = document.getElementById("scores-form");
    scoresForm.classList.remove("hidden");
  }

  onKeyDown(key) {
    if (key === ENTER) {
        if (this.isIntroMenu) {
          this.gameIntro();
        } else {
          window.location.reload();
        }
    }
  }
}
