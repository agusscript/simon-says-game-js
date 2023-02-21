const audio = document.querySelectorAll("audio");
const squares = document.querySelectorAll(".square");
const startButton = document.querySelector("#start");
let userSelection = [];
let computerSelection = [];
let round = 0;

roundNumberText("-");
roundTurnText("Press START");

startButton.onclick = function () {
  stateReset();
  play();
};

function play() {
  document.querySelector(".round-turn-text").style.color = "rgb(0, 245, 0)";
  roundTurnText("Computer");
  disableUserSquare();
  let newSquare = getRandomSquare();
  computerSelection.push(newSquare);

  const userTurnDelay = (computerSelection.length + 1) * 1000;

  computerSelection.forEach(function (square, index) {
    const delay = (index + 1) * 900;
    setTimeout(function () {
      highlightSquare(square);
      playSound(square);
    }, delay);
  });

  setTimeout(function () {
    roundTurnText("Player");
    enableUserSquare();
  }, userTurnDelay);

  userSelection = [];
  round++;
  roundNumberText(round);
}

function checkUserSelection(e) {
  const square = e.target;
  highlightSquare(square);
  playSound(square);
  userSelection.push(square);

  const computerSquare = computerSelection[userSelection.length - 1];
  if (square.id !== computerSquare.id) {
    loseGame();
    return;
  }

  if (userSelection.length === computerSelection.length) {
    disableUserSquare();
    setTimeout(play, 1000);
  }
}

function disableUserSquare() {
  squares.forEach(function (e) {
    e.onclick = "";
  });
}

function enableUserSquare() {
  squares.forEach(function (square) {
    square.onclick = checkUserSelection;
  });
}

function getRandomSquare() {
  let index = Math.floor(Math.random() * 4);
  return squares[index];
}

function highlightSquare(square) {
  square.style.filter = "brightness(180%)";
  square.style.opacity = "1";
  setTimeout(function () {
    square.style.opacity = "0.4";
  }, 400);
}

function playSound(element) {
  const audio = [
    new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
    new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
    new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
    new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
  ];

  if (element.id == "square-r") {
    audio[0].play();
  } else if (element.id == "square-g") {
    audio[1].play();
  } else if (element.id == "square-b") {
    audio[2].play();
  } else {
    audio[3].play();
  }
}

function stateReset() {
  computerSelection = [];
  userSelection = [];
  round = 0;
}

function loseGame() {
  document.querySelector(".audio-error").play();
  document.querySelector(".round-turn-text").style.color = "red";
  document.querySelector(".round-turn-text").style.textTransform = "uppercase";
  roundTurnText("Game over");
  disableUserSquare();
}

function roundNumberText(round) {
  document.querySelector(".round-num-text").textContent = round;
}

function roundTurnText(turn) {
  document.querySelector(".round-turn-text").textContent = turn;
}


