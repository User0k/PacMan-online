import('../css/style.css');
import { COLUMNS, createBoard, squares } from './gameBoard';
import Ghost from './ghosts';

// DOM
const scoreDisplay = document.getElementById('score');
const startBtn = document.getElementById('start-button');
// other variables
let curLocation = 290;
let nextSquare = curLocation;
let score = 0;
let powerTime = 10000;
export let scaredTimer = null;
let dotCount = null;
const DOTSCORE = 10;
const PILLSCORE = 50;
let scaredScore = 200;
let lives = 3;
// constant to control Pacman
const DIRECTIONS = {
  ArrowLeft: {
    direction: - 1,
  },
  ArrowUp: {
    direction: - COLUMNS,
  },
  ArrowRight: {
    direction: 1,
  },
  ArrowDown: {
    direction: COLUMNS,
  }
};

function getDots() {
  dotCount = squares.filter(square => square.classList.contains('dot')).length;
};

function createPacman(location) {
  squares[location].classList.add('pacman');
}

let start = function(e) {
  startBtn.classList.add('d-none');
  createBoard();
  getDots();
  createPacman(curLocation);

  let ghosts = [
    new Ghost('blinky', 228),
    new Ghost('pinky', 229),
    new Ghost('inky', 230),
    new Ghost('clyde', 231)
  ];

  ghosts.forEach(ghost => {
    squares[ghost.ghostLocation].classList.add('ghost', ghost.ghostName);
    setInterval(ghost.tryMove.bind(ghost), ghost.speed);
  });
};

let movePacman = function(e) {
  for (let key in DIRECTIONS) {
    nextSquare = squares[curLocation + DIRECTIONS[key].direction]; //variable for better understanding the code
    if (e.code == key
        && !nextSquare.classList.contains('wall')) {
      squares[curLocation].classList.remove('pacman');
      curLocation += DIRECTIONS[key].direction;
      squares[curLocation].classList.add('pacman');
    }
  }
  dotEat(curLocation);
  powerEat(curLocation);
  ghostMeetPacman(curLocation);
  checkForWin();
}

document.addEventListener('keydown', movePacman);
startBtn.addEventListener('click', start);

function dotEat(location) {
  if (squares[location].classList.contains('dot')) {
    squares[location].classList.remove('dot');
    score += DOTSCORE;
    scoreDisplay.textContent = score;
    dotCount--;
  };
}

function powerEat(location) {
  if (squares[location].classList.contains('power-pill')) {
    squares[location].classList.remove('power-pill');
    score += PILLSCORE;
    scoreDisplay.textContent = score;
    scaredScore = 200;
    GHOSTS.forEach(ghost => ghost.scare());
  }
}

function unscare() {
  ghosts.forEach(ghost => {
    ghost.isScared = false;
    squares[ghost.ghostLocation].classList.remove('scared-ghost');
  })
}

// function that initiates the beginning of the countdown since moment when Pacman have eaten the power-pill
export function initTimer() {
  scaredTimer = setTimeout(unscare, powerTime);
}

function ghostEat(location) {
  const eatenGhost = ghosts.find(ghost => ghost.ghostLocation == location);
  squares[location].classList.remove('scared-ghost', eatenGhost.ghostName, 'ghost');
  eatenGhost.isScared = false;
  //next line will put the eaten ghost into a random square in 228-231 interval (ghost lair)
  eatenGhost.ghostLocation = Math.ceil(Math.random() * 4 + 227);
  score += scaredScore;
  scaredScore *= 2;
  scoreDisplay.textContent = score;
}

function killPacman(location) {
  squares[location].classList.remove('pacman');
  lives--;
  if (lives > 0) {
    setTimeout(() => {
      curLocation = 290;
      squares[curLocation].classList.add('pacman');
    }, 1500);
  } else gameOver();
}

//function decides what to do when pacman will meet a ghost or a ghost will meet pacmen
export function ghostMeetPacman(location) {
  if (squares[location].classList.contains('ghost')) {
    if (squares[location].classList.contains('scared-ghost')) ghostEat(location);
    else killPacman(location);
  }
}