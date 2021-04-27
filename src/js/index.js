import('../css/style.css');
import { COLUMNS, createBoard, squares } from './gameBoard';
import Ghost from './ghosts'

createBoard();
let curLocation = 290;
let nextSquare = curLocation;
let score = 0;
let scoreDisplay = document.querySelector('#score');
export let scaredTimer = 10000;
const DOTSCORE = 10;
const PILLSCORE = 50;
let scaredScore = 200;

function createPacman(locat) {
  squares[locat].classList.add('pacman');
}

createPacman(curLocation);

const GHOSTS = [
  new Ghost('blinky', 228),
  new Ghost('pinky', 229),
  new Ghost('inky', 230),
  new Ghost('clyde', 231)
];

GHOSTS.forEach(ghost => {
  squares[ghost.ghostLocation].classList.add('ghost');
  squares[ghost.ghostLocation].classList.add(ghost.ghostName);
});

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

document.addEventListener('keydown', function(e) {
  for (let key in DIRECTIONS) {
    nextSquare = squares[curLocation + DIRECTIONS[key].direction]; //variable for better understanding the code
    if (e.code == key
        && !nextSquare.classList.contains('wall')
        && !nextSquare.classList.contains('ghost')) {
      squares[curLocation].classList.remove('pacman');
      curLocation += DIRECTIONS[key].direction;
      squares[curLocation].classList.add('pacman');
    }
  }
  dotEat(curLocation);
  powerEat(curLocation);
});

function dotEat(location) {
  if (squares[location].classList.contains('dot')) {
    squares[location].classList.remove('dot');
    score += DOTSCORE;
    scoreDisplay.textContent = score;
  }
}

function powerEat(location) {
  if (squares[location].classList.contains('power-pill')) {
    squares[location].classList.remove('power-pill');
    score += PILLSCORE;
    scoreDisplay.textContent = score;
    GHOSTS.forEach(ghost => ghost.scare())
  }
}