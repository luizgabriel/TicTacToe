import {
  CellValue,
  GameResult,
  getGameResult,
  getWinningPositions,
  isBottomCell,
  isLeftCell,
  isRightCell,
  isTopCell,
  togglePlayer,
  updateBoard,
} from '@/game';

describe('Game Rules', () => {
  describe('isLeftCell', () => {
    it.each([0, 3, 6])('index %d should be left cell', index => {
      expect(isLeftCell(index, 3)).toBeTruthy();
    });

    it.each([1, 2, 4, 5, 7, 8])('index %d should not be left cell', index => {
      expect(isLeftCell(index, 3)).toBeFalsy();
    });
  });

  describe('isRightCell', () => {
    it.each([2, 5, 8])('index %d should be right cell', index => {
      expect(isRightCell(index, 3)).toBeTruthy();
    });

    it.each([0, 1, 3, 4, 6, 7])('index %d should not be right cell', index => {
      expect(isRightCell(index, 3)).toBeFalsy();
    });
  });

  describe('isTopCell', () => {
    it.each([0, 1, 2])('index %d should be top cell', index => {
      expect(isTopCell(index, 3)).toBeTruthy();
    });

    it.each([3, 4, 5, 6, 7, 8])('index %d should not be top cell', index => {
      expect(isTopCell(index, 3)).toBeFalsy();
    });
  });

  describe('isBottomCell', () => {
    it.each([6, 7, 8])('index %d should be bottom cell', index => {
      expect(isBottomCell(index, 3)).toBeTruthy();
    });

    it.each([0, 1, 2, 3, 4, 5])('index %d should not be bottom cell', index => {
      expect(isBottomCell(index, 3)).toBeFalsy();
    });
  });

  describe('updateBoard', () => {
    it('should update board correctly', () => {
      const cells: CellValue[] = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
      const newCells = [' ', ' ', ' ', ' ', 'X', ' ', ' ', ' ', ' '];
      expect(updateBoard(4, 'X')(cells)).toEqual(newCells);
    });

    it('should not update board if cell is not empty', () => {
      const cells: CellValue[] = [' ', ' ', ' ', ' ', 'X', ' ', ' ', ' ', ' '];
      expect(updateBoard(4, 'X')(cells)).toEqual(cells);
    });
  });

  describe('togglePlayer', () => {
    it('should toggle player correctly', () => {
      expect(togglePlayer('X')).toBe('O');
      expect(togglePlayer('O')).toBe('X');
    });
  });

  describe('getWinningPositions', () => {
    it('should return winning positions for 3x3 board', () => {
      expect(getWinningPositions(3)).toEqual([
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        [0, 4, 8],
        [2, 4, 6],
      ]);
    });

    it('should return winning positions for 4x4 board', () => {
      expect(getWinningPositions(4)).toEqual([
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11],
        [12, 13, 14, 15],

        [0, 4, 8, 12],
        [1, 5, 9, 13],
        [2, 6, 10, 14],
        [3, 7, 11, 15],

        [0, 5, 10, 15],
        [3, 6, 9, 12],
      ]);
    });

    it('should return winning positions for 5x5 board', () => {
      expect(getWinningPositions(5)).toEqual([
        [0, 1, 2, 3, 4],
        [5, 6, 7, 8, 9],
        [10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19],
        [20, 21, 22, 23, 24],

        [0, 5, 10, 15, 20],
        [1, 6, 11, 16, 21],
        [2, 7, 12, 17, 22],
        [3, 8, 13, 18, 23],
        [4, 9, 14, 19, 24],

        [0, 6, 12, 18, 24],
        [4, 8, 12, 16, 20],
      ]);
    });
  });

  describe('isWinningBoard', () => {
    type BoardResultTest = {
      board: CellValue[];
      result: GameResult;
    };

    // prettier-ignore
    it.each([
      // Draw
      {
        board: [
            'O', 'O', 'X',
            'X', 'X', 'O',
            'O', 'X', 'X',
        ],
        result: 'Draw',
      },

      // None
      {
        board: [
            'O', 'O', ' ',
            'X', 'X', ' ',
            'O', 'X', 'X',
        ],
        result: 'None',
      },

      // X
      {
        board: [
                'X', 'O', ' ',
                'X', 'X', ' ',
                'O', 'X', 'X',
        ],
        result: 'X',
      },
      {
        board: [
                'O', 'O', 'X',
                'X', 'X', ' ',
                'X', 'O', 'O',
        ],
        result: 'X',
      },

      // O
      {
        board: [
            'O', 'O', ' ',
            'X', 'O', ' ',
            ' ', 'O', 'X',
        ],
        result: 'O',
      },
      {
        board: [
            'O', 'X', 'O',
            'X', 'X', 'O',
            ' ', ' ', 'O',
        ],
        result: 'O',
      },

    ] satisfies BoardResultTest[])(
      'should get correct result: $result',
      ({board, result}) => {
        expect(getGameResult(board, 3)).toBe(result);
      },
    );
  });
});
