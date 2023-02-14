const audio = document.querySelectorAll("audio");
const squares = document.querySelectorAll(".square");
const startButton = document.querySelector("#start");
let userSelection = [];
let computerSelection = [];
let round = 0;

function playSound() {
  for (let i = 0; i < 4; i++) {
    squares[i].onclick = function () {
      audio[i].play();
    };
  }
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

function play() {
  let newSquare = getRandomSquare();
  computerSelection.push(newSquare);

  computerSelection.forEach(function (square, index) {
    const delay= (index + 1) * 1000;
    setTimeout(function () {
      highlightSquare(square);
      playSound(square);
    }, delay);
  });

  round++;
}

startButton.onclick = function () {
  userSelection = [];
  computerSelection = [];
  round = 0;

  setInterval(play, 5000);
};
