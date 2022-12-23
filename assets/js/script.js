const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

const game = new Game(ctx)
game.start();

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

// const playAgainButton = document.getElementById("play-again")
// playAgainButton.onclick = function() {
//   if (playAgainButton.classList.contains("hidden")) {
//     console.log("cool")
//       playAgainButton.classList.remove("hidden")
//     }
//   game.start()
//   }
}