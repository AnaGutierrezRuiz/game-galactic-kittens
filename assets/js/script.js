const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

const game = new Game(ctx)
game.initListeners()


const ship1Button = document.getElementById("ship-button1")
const ship2Button = document.getElementById("ship-button2")
const ship3Button = document.getElementById("ship-button3")
const ship4Button = document.getElementById("ship-button4")

ship1Button.onclick = () => {
  console.log(ship1)
  game.spaceship.img.frameIndex = 0
}
ship2Button.onclick = () => {
  console.log(ship2)
  game.spaceship.img.frameIndex = 1
}
ship3Button.onclick = () => {
  game.spaceship.img.frameIndex = 2
}
ship4Button.onclick = () => {
  game.spaceship.img.frameIndex = 3
}





const musicButton = document.getElementById("music-on-off")

musicButton.onclick = function() {
  if (musicButton.classList.contains("on")) {
    game.music.volume = 0
    game.meowSound.volume = 0
    game.levelUpSound.volume = 0
    musicButton.classList.remove("on")
  } else {
    game.music.volume = 0.5
    game.meowSound.volume = 0.5
    game.levelUpSound.volume = 1
    musicButton.classList.add("on")
  }
}