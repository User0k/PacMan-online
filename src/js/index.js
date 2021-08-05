import('../css/style.css');
import Board, { COLUMNS, squares } from './gameBoard'
import { DIRECTIONS } from './controls';
import Ghost from './ghosts';
import level from './levels';
import { delayStart, delayCounter } from './delay';
import { soundBeginning, soundDeath, soundDot, soundEatGhost, soundGameOver, soundPowerPill } from '../sounds';

// DOM
const hider = document.getElementById('hider');
const scoreDisplay = document.getElementById('score');
const livesDisplay = document.getElementById('lives');
const startBtn = document.getElementById('start-button');
const startDelay = document.getElementById('start-delay');
const winner = document.getElementById('winner');
const loser = document.getElementById('loser');
// constants and score counters
const DOTSCORE = 10;
const PILLSCORE = 50;
let score = 0;
let dotCount = null;
let scaredScore = 200;
// pacman locations
let curLocation = 290;
let nextSquare = curLocation;
// other variables
let globalSpeed = 1000 //ms
let powerTime = globalSpeed * 10;
let scaredTimer = null;
let lives = 3;
let ghosts = null;
const gameBoard = new Board;

function getDots() {
  dotCount = squares.filter(square => square.classList.contains('dot')).length;
};

function renderBoard() {
  gameBoard.createBoard();
  getDots();
  squares[curLocation].classList.add('pacman');

  ghosts = [
    new Ghost('blinky', 228),
    new Ghost('pinky', 229),
    new Ghost('inky', 230),
    new Ghost('clyde', 231),
  ];

  ghosts.forEach((ghost) => {
    squares[ghost.ghostLocation].classList.add('ghost', ghost.ghostName);
    setInterval(ghost.tryMove.bind(ghost), ghost.speed);
  });
}

function playSound(audio) {
  const sound = new Audio(audio);
  sound.play();
}

// invokes only once after the user clicks the start button
function start() {
  startBtn.classList.add('d-none');
  hider.classList.remove('d-none');
  renderBoard();
  playSound(soundBeginning);
  ghosts.forEach(ghost => ghost.freeze = true);
  delayStart(delayCounter);
  setTimeout(() => {
    startDelay.classList.add('d-none');
    document.addEventListener('keydown', movePacman);
    ghosts.forEach(ghost => ghost.freeze = false);
  }, delayCounter.reduce((acc, val) => acc + val[1], 400));
}

// invokes every time the user starts the next level.
// Serves as a decorator to 'renderBoard' function, places pacman on the board and hanles its listener
function renderNextLevel() {
  winner.classList.add('d-none');
  gameBoard.curLevel = level[gameBoard.levelNumber];
  gameBoard.clearBoard();
  renderBoard();
  squares[curLocation].classList.remove('pacman');
  curLocation = 290;
  squares[curLocation].classList.add('pacman');
  document.addEventListener('keydown', movePacman);
  const grids = document.querySelectorAll('.grid');
  gameBoard.wrapper.removeChild(grids[1]);
}

function movePacman(e) {
  for (let key in DIRECTIONS) {
    nextSquare = squares[curLocation + DIRECTIONS[key].direction]; // variable for better understanding the code
    squares[curLocation].classList.remove('pacman');
    if (e.code === key && curLocation % COLUMNS === DIRECTIONS[key].gridEnd) {
      curLocation += DIRECTIONS[key].walkThrough;
      squares[curLocation].style.transform = `rotate(${DIRECTIONS[key].rotate}deg)`;
    } else if (e.code === key && !nextSquare.classList.contains('wall')) {
      curLocation += DIRECTIONS[key].direction;
      squares[curLocation].style.transform = `rotate(${DIRECTIONS[key].rotate}deg)`;
    }
    squares[curLocation].classList.add('pacman');
  }

  dotEat(curLocation);
  powerEat(curLocation);
  ghostMeetPacman(curLocation);
  checkForWin();
}

function dotEat(location) {
  if (squares[location].classList.contains('dot')) {
    squares[location].classList.remove('dot');
    score += DOTSCORE;
    scoreDisplay.textContent = score;
    dotCount--;
    playSound(soundDot);
  }
}

function powerEat(location) {
  if (squares[location].classList.contains('power-pill')) {
    squares[location].classList.remove('power-pill');
    score += PILLSCORE;
    scoreDisplay.textContent = score;
    scaredScore = 200;
    ghosts.forEach(ghost => ghost.scare());
    playSound(soundPowerPill);
  }
}

function ghostEat(location) {
  const eatenGhost = ghosts.find(ghost => ghost.ghostLocation === location);
  squares[location].classList.remove('scared-ghost', eatenGhost.ghostName, 'ghost');
  eatenGhost.isScared = false;
  //next line will put the eaten ghost into a random square within 228-231 interval (ghost lair)
  eatenGhost.ghostLocation = Math.ceil(Math.random() * 4 + 227);
  score += scaredScore;
  scaredScore *= 2;
  scoreDisplay.textContent = score;
  playSound(soundEatGhost);
}

// checks if the user has collcted all the dots, and if so, call the next level (or the first one if the levels array has ended)
function checkForWin() {
  if (dotCount === 0) {
    document.removeEventListener('keydown', movePacman);
    ghosts.forEach((ghost) => (ghost.freeze = true));
    ghosts = null;
    winner.classList.remove('d-none');
    globalSpeed *= 0.8;
    if (gameBoard.levelNumber < level.length - 1) {
      gameBoard.levelNumber++;
      document.addEventListener('keydown', renderNextLevel, {once: true});
    } else {
      gameBoard.levelNumber = 0;
      document.addEventListener('keydown', renderNextLevel, {once: true});
    };
  };
}

function gameOver() {
  document.removeEventListener('keydown', movePacman);
  loser.classList.remove('d-none');
  document.addEventListener('keydown', () => location.reload());
  playSound(soundGameOver);
}

// allows the ghost to become 'normal' after it had been eaten or power-pill time has expired
function unscare() {
  ghosts.forEach(ghost => {
    ghost.isScared = false;
    squares[ghost.ghostLocation].classList.remove('scared-ghost');
  })
}

// function that initiates the beginning of the countdown since moment when Pacman have eaten the power-pill
function initTimer() {
  scaredTimer = setTimeout(unscare, powerTime);
}

function killPacman(location) {
  squares[location].classList.remove('pacman');
  lives--;
  livesDisplay.textContent = lives;
  if (lives > 0) {
    document.removeEventListener('keydown', movePacman);
    setTimeout(() => {
      curLocation = 290;
      squares[curLocation].classList.add('pacman');
      document.addEventListener('keydown', movePacman);
    }, globalSpeed * 1.5);
    playSound(soundDeath);
  } else gameOver();
}

//function decides what to do when pacman will meet a ghost or a ghost will meet pacmen
function ghostMeetPacman(location) {
  if (squares[location].classList.contains('ghost')) {
    if (squares[location].classList.contains('scared-ghost')) ghostEat(location);
    else killPacman(location);
  }
}

startBtn.addEventListener('click', start);

export { ghostMeetPacman, initTimer, scaredTimer, globalSpeed, startDelay };