const audio = document.querySelectorAll("audio");
const square = document.querySelectorAll(".square");

function playSound() {
  for (let i = 0; i < 4; i++) {
    square[i].onclick = function () {
      audio[i].play();
    };
  }
}

playSound();
