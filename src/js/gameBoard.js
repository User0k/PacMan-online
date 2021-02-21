import level from './levels';

const COLUMNS = 20;
const grid = document.querySelector('.grid');
grid.style.width = `${COLUMNS * 20}px`;

export default function createBoard() {
  const squares = [];
  for (let i = 0; i < level.length; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    grid.appendChild(square);
    squares.push(square);

    if(level[i] === 0) {
      squares[i].classList.add('empty')
    } else if (level[i] === 1) {
      squares[i].classList.add('wall')
    } else if (level[i] === 2) {
      squares[i].classList.add('gold')
    } else if (level[i] === 3) {
      squares[i].classList.add('power-pill')
    } else if(level[i] === 4) {
      squares[i].classList.add('ghost-lair')
    }
  }
};