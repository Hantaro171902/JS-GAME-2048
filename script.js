let grid = document.querySelector(".grid");
const startButton = document.getElementById("start-button");
const container = document.querySelector(".container");
const coverScreen = document.querySelector("cover-screen");
const result = document.getElementById("result");
const overText = document.getElementById("over-text");

let matrix,
  score,
  isSwiped,
  touchY,
  initialY = 0,
  touchX,
  inittialX = 0,
  row = 4,
  columns = 4,
  swipeDirection;

let rectLeft = grid.getBoundingClientRect().left;
let rectTop = grid.getBoundingClientRect().top;

const getXY = (e) => {
  touchX = e.touches[0].pageX - rectLeft;
  touchY = e.touches[0].pageX - rectTop;
};

const createGrid = () => {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const boxDiv = document.createElement("div");
      boxDiv.setAttribute("data-position", `${i}_{j}`);
      grid.appendChild(boxDiv);
    }
  }
};

const adjacentCheck = (arr) => {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] == arr[i + 1]) {
      return true;
    }
  }
  return false;
};

const possibleMovesCheck = () => {
  for (let i in matrix) {
    if (adjacentCheck(matrix[i])) {
      return true;
    }
    let colarr = [];
    for (let j = 0; j < columns; j++) {
      colarr.push(matrix[i][j]);
    }
    if (adjacentCheck(colarr)) {
      return true;
    }
  }
  return false;
};

const randomPosition = (arr) => {
  return Math.floor(Math.random() * arr.length);
};

const hasEmptyBox = () => {
  for (let r in matrix) {
    for (let c in matrix[r]) {
      if (matrix[r][c] == 0) {
        return true;
      }
    }
  }
  return false;
};

const gameoverCheck = () => {
  if (!possibleMovesCheck()) {
    coverScreen.classList.remove("hide");
    container.classList.add("hide");
    overText.classList.remove("hide");
    result.innerText = `Final score: ${score}`;
    startButton.innerText = "Restart Game";
  }
};

const generateTwo = () => {
  if (hasEmptyBox()) {
    let randomRow = randomPosition(matrix);
    let randomCol = randomPosition(matrix[randomPosition(matrix)]);
    if (matrix[randomRow][randomCol] == 0) {
      matrix[randomRow][randomCol] = 2;
      let element = document.querySelector(
        `[data-position = ${randomRow}_${randomCol}]`
      );
      element.innerHTML = 2;
      element.classList.add("box-2");
    } else {
      generateTwo();
    }
  } else {
    gameoverCheck();
  }
};
