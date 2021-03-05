import('../css/style.css');
import { COLUMNS, createBoard, squares } from './gameBoard';

createBoard();
let curLocation = 290;
//const ROWS = level.length / COLUMNS;

function createPacman(locat) {
  squares[locat].classList.add('pacman');
}

createPacman(curLocation);

class Pacman {
  constructor(position, move) {
    this.position = curLocation;
    this.movement = DIRECTIONS;
  }

  movePacman = document.addEventListener('keydown', function(e) {
    if ((e.code == 'ArrowUp') && (!squares[curLocation - COLUMNS].classList.contains('wall'))) {
      squares[curLocation].classList.remove('pacman');
      squares[curLocation - COLUMNS].classList.add('pacman');
      return curLocation -= COLUMNS
    } else if (e.code == 'ArrowDown') {
      squares[curLocation].classList.remove('pacman');
      squares[curLocation + COLUMNS].classList.add('pacman');
      return curLocation += COLUMNS
    } else if (e.code == 'ArrowLeft') {
      squares[curLocation].classList.remove('pacman');
      squares[curLocation - 1].classList.add('pacman');
      return curLocation--
    } else if (e.code == 'ArrowRight') {
      squares[curLocation].classList.remove('pacman');
      squares[curLocation + 1].classList.add('pacman');
      return curLocation++
    }
  });

}

const pacman = new Pacman();

