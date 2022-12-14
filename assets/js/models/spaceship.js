class Spaceship {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = 160;
    this.y = 500;
    this.w = 70;
    this.h = 80;
    this.vx = 0;
    this.vy = 0;

    this.img = new Image();
    this.img.src = "assets/resources/images/spaceship1.png";

    // An empty array in which bullets will be pushed every time the player presses ENTER
    this.bullets = [];
  }

  draw() {
    this.ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.img.width / 4,
      this.img.height / 4
    );
    this.bullets.forEach((bullet) => bullet.draw());
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;

    // Conditionals are used below to avoid the spaceship from leaving the canvas container
    if (this.y <= 0) {
      this.y = 0;
      this.vy = 0;
    }

    if (this.y + this.h >= this.ctx.canvas.height) {
      this.y = this.ctx.canvas.height - this.h;
      this.vy = 0;
    }

    if (this.x <= 0) {
      this.x = 0;
      this.vx = 0;
    }

    if (this.x + this.w >= this.ctx.canvas.width) {
      this.x = this.ctx.canvas.width - this.w;
      this.vx = 0;
    }
    this.bullets.forEach((bullet) => bullet.move());
  }

  shoot() {
    const x = this.x + this.w / 2;
    const y = this.y;
    const bullet = new Bullet(this.ctx, x, y);
    this.bullets.push(bullet);

    // Play shooting sound only if both the game and the sound are on
    if (game.isGameOn && musicButton.classList.contains("on")) {
      const shootSound = new Audio("assets/resources/sounds/shoot.mp3");
      shootSound.volume = 0.1;
      shootSound.play();
    }
  }

  // The spaceship moves to the left or right when the corresponding arrow keys are pressed. The spaceship shoots when space key is pressed
  onKeyDown(key) {
    switch (key) {
      case RIGHT:
        this.vx = 3;
        break;
      case LEFT:
        this.vx = -3;
        break;
      case SPACE:
        this.shoot();
        break;
    }
  }

  // The spaceship stops moving as soon as the left or right arrow keys are no longer being pressed
  onKeyUp(key) {
    switch (key) {
      case RIGHT:
      case LEFT:
        this.vx = 0;
        break;
    }
  }
}
