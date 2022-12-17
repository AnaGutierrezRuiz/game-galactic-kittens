class Weapon {
  constructor(shooter) {
    this.shooter = shooter
    this.bullets = []
  }

  shoot() {
    const bullet = new Bullet(
      this.shooter.ctx,
      this.shooter.x + this.shooter.w * 0.8,
      this.shooter.y + this.shooter.h * 0.9
    )
    this.bullets.push(bullet)
  }

  clearBullets() {
    this.bullets = this.bullets.filter(bullet => bullter.isVisible())
  }

  draw() {
    this.bullets.forEach(bullet => bullet.draw())
  }

  move() {
    this.bullets.forEach(bullet => bullet.move())
  }
}