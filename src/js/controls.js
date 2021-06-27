import { COLUMNS } from './gameBoard';

export const DIRECTIONS = {
  ArrowLeft: {
    direction: - 1,
    rotate: 180,
    gridEnd: 0,
    walkThrough: COLUMNS - 1,
  },
  ArrowUp: {
    direction: - COLUMNS,
    rotate: -90,
  },
  ArrowRight: {
    direction: 1,
    rotate: 0,
    gridEnd: COLUMNS - 1,
    walkThrough: - COLUMNS + 1,
  },
  ArrowDown: {
    direction: COLUMNS,
    rotate: 90,
  }
};