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
    // Check if there are any empty box (value=0)
    let randomRow = randomPosition(matrix);
    let randomCol = randomPosition(matrix[randomPosition(matrix)]);
    if (matrix[randomRow][randomCol] == 0) {
      // checkk if position is empty
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

const generateFour = () => {
  if (hasEmptyBox()) {
    let randomRow = randomPosition(matrix);
    let randomCol = randomPosition(matrix[randomPosition(matrix)]);
    if (matrix[randomRow][randomCol] == 0) {
      matrix[randomRow][randomCol] = 4;
      let element = document.querySelector(
        `[data-position= ${randomCol}_${randomCol}]`
      );
      element.innerHTML = 4;
      element.classList.add("box-4");
    } else {
      generateFour();
    }
  } else {
    gameoverCheck();
  }
};

const removeZero = (arr) => arr.filter((num) => num);
const checker = (arr, reverseArr = false) => {
  arr = reverseArr ? remove(arr).reverse() : removeZero(arr);

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] == arr[i + 1]) {
      arr[i] += arr[i + 1];
      arr[i + 1] = 0;
      score += arr[i];
    }
  }

  arr = reverseArr ? remove(arr).reverse() : removeZero(arr);

  let missingCount = 4 - arr.length;
  while (missingCount > 0) {
    if (reverseArr) {
      arr.unshilf(0);
    } else {
      arr.push(0);
    }
    missingCount -= 1;
  }
  return arr;
};

const sildeDown = () => {
  for (let i = 0; i < columns; i++) {
    let num = [];
    for (let j = 0; j < rows; j++) {
      num.push(matrix[j][i]);
    }
    num = checker(num, true);
    for (let j = 0; j < rows; j++) {
      matrix[j][i] = num[j];
      let element = document.querySelector(`
        [data-position=${j}_${i}]`);
    }
  }
};
