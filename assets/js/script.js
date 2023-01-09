const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

const game = new Game(ctx)
game.initListeners()


const ship1Button = document.getElementById("ship-button1")
const ship2Button = document.getElementById("ship-button2")
const ship3Button = document.getElementById("ship-button3")
const ship4Button = document.getElementById("ship-button4")

ship1Button.onclick = () => {
  if (!ship1Button.classList.contains("selected-btn")) {
    ship1Button.classList.add("selected-btn")
  }
  if (ship2Button.classList.contains("selected-btn")) {
    ship2Button.classList.remove("selected-btn")
  } else if (ship3Button.classList.contains("selected-btn")) {
    ship3Button.classList.remove("selected-btn")
  } else if (ship4Button.classList.contains("selected-btn")) {
    ship4Button.classList.remove("selected-btn")
  }
  game.spaceship.img.src = "assets/resources/images/ship1.png"
}

ship2Button.onclick = () => {
  if (!ship2Button.classList.contains("selected-btn")) {
    ship2Button.classList.add("selected-btn")
  }
  if (ship1Button.classList.contains("selected-btn")) {
    ship1Button.classList.remove("selected-btn")
  } else if (ship3Button.classList.contains("selected-btn")) {
    ship3Button.classList.remove("selected-btn")
  } else if (ship4Button.classList.contains("selected-btn")) {
    ship4Button.classList.remove("selected-btn")
  }
  game.spaceship.img.src = "assets/resources/images/ship2.png"
}

ship3Button.onclick = () => {
  if (!ship3Button.classList.contains("selected-btn")) {
    ship3Button.classList.add("selected-btn")
  }
  if (ship1Button.classList.contains("selected-btn")) {
    ship1Button.classList.remove("selected-btn")
  } else if (ship2Button.classList.contains("selected-btn")) {
    ship2Button.classList.remove("selected-btn")
  } else if (ship4Button.classList.contains("selected-btn")) {
    ship4Button.classList.remove("selected-btn")
  }
  game.spaceship.img.src = "assets/resources/images/ship3.png"
}

ship4Button.onclick = () => {
  if (!ship4Button.classList.contains("selected-btn")) {
    ship4Button.classList.add("selected-btn")
  }
  if (ship1Button.classList.contains("selected-btn")) {
    ship1Button.classList.remove("selected-btn")
  } else if (ship2Button.classList.contains("selected-btn")) {
    ship2Button.classList.remove("selected-btn")
  } else if (ship3Button.classList.contains("selected-btn")) {
    ship3Button.classList.remove("selected-btn")
  }
  game.spaceship.img.src = "assets/resources/images/ship4.png"
}

const musicButton = document.getElementById("music-on-off")


musicButton.onclick = function() {
  if (musicButton.classList.contains("on")) {
    game.music.volume = 0
    game.meowSound.volume = 0
    game.levelUpSound.volume = 0
    game.heartUpSound1.volume = 0
    game.heartUpSound2.volume = 0
    musicButton.classList.remove("on")
  } else {
    game.music.volume = 0.2
    game.meowSound.volume = 0.1
    game.levelUpSound.volume = 0.1
    game.heartUpSound1.volume = 0.1
    game.heartUpSound2.volume = 0.1
    musicButton.classList.add("on")
  }
}

let players = JSON.parse(localStorage.getItem('players')) || []
//players = []

  const scoresForm = document.getElementById("scores-form")
  
  scoresForm.onsubmit = (event) => {
    event.preventDefault()
    console.log(event)
    const playerName = document.getElementById("player-name-input").value
    const playerScore = game.score
    const playerLevel = game.level
    players.push({
      spaceship: game.spaceship.img.src,
      name: playerName,
      score: playerScore,
      level: playerLevel 
    })
    players.sort((a, b) => b.score - a.score).splice(5)
    localStorage.clear()
  localStorage.setItem("players", JSON.stringify(players))
  const scoresList = document.getElementById("scores-list")

  players.forEach(player => {
    scoresList.innerHTML += `
    <tr>
    <td><img src=${player.spaceship} width="25"></td>
    <td>${player.name}</td>
    <td>${player.score}</td>
    <td>${player.level}</td>
    </tr>`
  })
  scoresList.classList.remove("hidden")
  scoresForm.classList.add("hidden")
}
