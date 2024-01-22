export type PlayerValue = 'X' | 'O';
export type CellValue = PlayerValue | ' ';

export const defaultRowSize = 3;
export const initialPlayer: PlayerValue = 'X';
export const initialBoard: CellValue[] = Array(
  defaultRowSize * defaultRowSize,
).fill(' ');

export const isLeftCell = (index: number, rowSize = defaultRowSize) =>
  index % rowSize === 0;

export const isRightCell = (index: number, rowSize = defaultRowSize) =>
  (index + 1) % rowSize === 0;

export const isTopCell = (index: number, rowSize = defaultRowSize) =>
  index < rowSize;

export const isBottomCell = (index: number, rowSize = defaultRowSize) =>
  index >= rowSize * (rowSize - 1);

export const updateBoard =
  (index: number, player: PlayerValue) => (cells: CellValue[]) => {
    if (cells[index] !== ' ') {
      return cells;
    }

    const newCells = [...cells];
    newCells[index] = player;
    return newCells;
  };

export const togglePlayer = (player: PlayerValue): PlayerValue =>
  player === 'X' ? 'O' : 'X';

export const getHorizontalPositions = (rowSize = defaultRowSize): number[][] =>
  Array(rowSize)
    .fill(0)
    .map((_, i) =>
      Array(rowSize)
        .fill(0)
        .map((_, j) => i * rowSize + j),
    );

export const getVerticalPositions = (rowSize = defaultRowSize): number[][] =>
  Array(rowSize)
    .fill(0)
    .map((_, i) =>
      Array(rowSize)
        .fill(0)
        .map((_, j) => j * rowSize + i),
    );

export const getDiagonalPositions = (rowSize = defaultRowSize): number[][] => [
  Array(rowSize)
    .fill(0)
    .map((_, i) => i * rowSize + i),

  Array(rowSize)
    .fill(0)
    .map((_, i) => (i + 1) * rowSize - (i + 1)),
];

export const getWinningPositions = (rowSize = defaultRowSize): number[][] => [
  ...getHorizontalPositions(rowSize),
  ...getVerticalPositions(rowSize),
  ...getDiagonalPositions(rowSize),
];

export type GameResult = PlayerValue | 'Draw' | 'None';

export const getGameResult = (
  cells: CellValue[],
  rowSize = defaultRowSize,
): GameResult => {
  const winningPositions = getWinningPositions(rowSize);
  const winningPosition = winningPositions.find(position =>
    position.every(
      index => cells[index] === cells[position[0]] && cells[index] !== ' ',
    ),
  );

  const winningPlayer = winningPosition ? cells[winningPosition[0]] : ' ';
  if (winningPlayer !== ' ') {
    return winningPlayer;
  }

  return cells.every(cell => cell !== ' ') ? 'Draw' : 'None';
};
