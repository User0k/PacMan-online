import('../css/style.css');
import { COLUMNS, createBoard, squares } from './gameBoard';

createBoard();
let curLocation = 290;
const DOTSCORE = 10;
const PILLSCORE = 50;
const SCAREDSCORE = 200;

function createPacman(locat) {
  squares[locat].classList.add('pacman');
}

createPacman(curLocation);

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
    let nextSquare = squares[curLocation + DIRECTIONS[key].direction]; //variable for better understanding the code
    if (e.code == key
        && !nextSquare.classList.contains('wall')
        && !nextSquare.classList.contains('ghost')) {
      squares[curLocation].classList.remove('pacman');
      curLocation += DIRECTIONS[key].direction;
      squares[curLocation].classList.add('pacman');
    }
  }
});