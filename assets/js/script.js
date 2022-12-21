const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

const game = new Game(ctx)
game.start();

const musicButton = document.getElementById("music-on-off")

musicButton.onclick = function() {
  if (musicButton.classList.contains("on")) {
    game.audio.volume = 0
    musicButton.classList.remove("on")
  } else {
    game.audio.volume = 0.5;
    musicButton.classList.add("on")
  }
}