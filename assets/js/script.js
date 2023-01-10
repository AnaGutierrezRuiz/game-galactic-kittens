const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const game = new Game(ctx);
game.initListeners();

const spaceship1Button = document.getElementById("spaceship-button1");
const spaceship2Button = document.getElementById("spaceship-button2");
const spaceship3Button = document.getElementById("spaceship-button3");
const spaceship4Button = document.getElementById("spaceship-button4");

spaceship1Button.onclick = () => {
  if (!spaceship1Button.classList.contains("selected-btn")) {
    spaceship1Button.classList.add("selected-btn");
  }
  if (spaceship2Button.classList.contains("selected-btn")) {
    spaceship2Button.classList.remove("selected-btn");
  } else if (spaceship3Button.classList.contains("selected-btn")) {
    spaceship3Button.classList.remove("selected-btn");
  } else if (spaceship4Button.classList.contains("selected-btn")) {
    spaceship4Button.classList.remove("selected-btn");
  }
  game.spaceship.img.src = "assets/resources/images/spaceship1.png";
};

spaceship2Button.onclick = () => {
  if (!spaceship2Button.classList.contains("selected-btn")) {
    spaceship2Button.classList.add("selected-btn");
  }
  if (spaceship1Button.classList.contains("selected-btn")) {
    spaceship1Button.classList.remove("selected-btn");
  } else if (spaceship3Button.classList.contains("selected-btn")) {
    spaceship3Button.classList.remove("selected-btn");
  } else if (spaceship4Button.classList.contains("selected-btn")) {
    spaceship4Button.classList.remove("selected-btn");
  }
  game.spaceship.img.src = "assets/resources/images/spaceship2.png";
};

spaceship3Button.onclick = () => {
  if (!spaceship3Button.classList.contains("selected-btn")) {
    spaceship3Button.classList.add("selected-btn");
  }
  if (spaceship1Button.classList.contains("selected-btn")) {
    spaceship1Button.classList.remove("selected-btn");
  } else if (spaceship2Button.classList.contains("selected-btn")) {
    spaceship2Button.classList.remove("selected-btn");
  } else if (spaceship4Button.classList.contains("selected-btn")) {
    spaceship4Button.classList.remove("selected-btn");
  }
  game.spaceship.img.src = "assets/resources/images/spaceship3.png";
};

spaceship4Button.onclick = () => {
  if (!spaceship4Button.classList.contains("selected-btn")) {
    spaceship4Button.classList.add("selected-btn");
  }
  if (spaceship1Button.classList.contains("selected-btn")) {
    spaceship1Button.classList.remove("selected-btn");
  } else if (spaceship2Button.classList.contains("selected-btn")) {
    spaceship2Button.classList.remove("selected-btn");
  } else if (spaceship3Button.classList.contains("selected-btn")) {
    spaceship3Button.classList.remove("selected-btn");
  }
  game.spaceship.img.src = "assets/resources/images/spaceship4.png";
};

const musicButton = document.getElementById("music-on-off");

musicButton.onclick = function () {
  if (musicButton.classList.contains("on")) {
    game.music.volume = 0;
    game.meowSound.volume = 0;
    game.levelUpSound.volume = 0;
    game.heartUpSound1.volume = 0;
    game.heartUpSound2.volume = 0;
    musicButton.classList.remove("on");
  } else {
    game.music.volume = 0.2;
    game.meowSound.volume = 0.1;
    game.levelUpSound.volume = 0.1;
    game.heartUpSound1.volume = 0.1;
    game.heartUpSound2.volume = 0.1;
    musicButton.classList.add("on");
  }
};

let players = JSON.parse(localStorage.getItem("players")) || [];
players = []

const scoresForm = document.getElementById("scores-form");

scoresForm.onsubmit = (event) => {
  event.preventDefault();
  console.log(event);
  const playerName = document.getElementById("player-name-input").value;
  const playerScore = game.score;
  const playerLevel = game.level;
  players.push({
    spaceship: game.spaceship.img.src,
    name: playerName,
    score: playerScore,
    level: playerLevel,
  });
  players.sort((a, b) => b.score - a.score).splice(4);
  localStorage.clear();
  localStorage.setItem("players", JSON.stringify(players));
  const scoresList = document.getElementById("scores-list");

  players.forEach((player) => {
    scoresList.innerHTML += `
    <tr>
    <td><img src=${player.spaceship} width="25"></td>
    <td>${player.name}</td>
    <td>${player.score}</td>
    <td>${player.level}</td>
    </tr>`;
  });
  scoresList.classList.remove("hidden");
  scoresForm.classList.add("hidden");
};
