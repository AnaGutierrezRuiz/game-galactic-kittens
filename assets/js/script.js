const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

const game = new Game(ctx)
game.start();

const musicButton = document.getElementById("music")
console.log(musicButton)

musicButton.onlick = function() {
  if (musicButton.classList.contains("on")) {
    game.audio.volume = 0
    musicButton.innerText = "OFF"
    musicButton.classList.remove("on")
  } else {
    game.audio.volume = 0.5;
    musicButton.innerText = "ON"
    musicButton.classList.add("on")
  }
}