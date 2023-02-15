const audio = document.querySelectorAll("audio");
const squares = document.querySelectorAll(".square");
const startButton = document.querySelector("#start");
let userSelection = [];
let computerSelection = [];
let round = 0;

function play() {
  disableUserSquare();
  let newSquare = getRandomSquare();
  computerSelection.push(newSquare);

  const userTurnDelay = (computerSelection.length + 1) * 1000;

  computerSelection.forEach(function (square, index) {
    const delay = (index + 1) * 1000;
    setTimeout(function () {
      highlightSquare(square);
      playSound(square);
    }, delay);
  });

  setTimeout(function () {
    enableUserSquare();
  }, userTurnDelay);

  userSelection = [];
  round++;
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
  square.style.opacity = "1";
  setTimeout(function () {
    square.style.opacity = "0.4";
  }, 500);
}

function playSound(val) {
  if (val.id == "square-r") {
    audio[0].play();
  } else if (val.id == "square-g") {
    audio[1].play();
  } else if (val.id == "square-b") {
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
  console.log("you lose");
  disableUserSquare();
}

startButton.onclick = function () {
  stateReset();
  play();
};
