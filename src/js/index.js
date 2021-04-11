import('../css/style.css');
import { COLUMNS, createBoard, squares } from './gameBoard';

createBoard();
let curLocation = 290;
//const ROWS = level.length / COLUMNS;

function createPacman(locat) {
  squares[locat].classList.add('pacman');
}

createPacman(curLocation);

const DIRECTIONS = {
  ArrowLeft: {
    move: squares[curLocation - 1],
    direction: - 1,
  },
  ArrowUp: {
    move: squares[curLocation - COLUMNS],
    direction: - COLUMNS,
  },
  ArrowRight: {
    move: squares[curLocation + 1],
    direction: 1,
  },
  ArrowDown: {
    move: squares[curLocation + COLUMNS],
    direction: COLUMNS,
  }
};

document.addEventListener('keydown', function(e) {
  for (let key in DIRECTIONS) {
    if (e.code == key) {
      squares[curLocation].classList.remove('pacman');
      curLocation += DIRECTIONS[key].direction;
      squares[curLocation].classList.add('pacman');
    }
  }
});