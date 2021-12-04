import { parseLines, transposeMatrix } from '../helpers/helper';

type BingoElement = {
  num: string;
  isMarked: boolean;
}

class BingoBoard {
  board: BingoElement[][]

  constructor(bingoLines: string[]) {
    const parseBingoLine = (s: string): BingoElement[] => s.split(' ')
      .filter((ele) => ele !== '')
      .map((num) => ({
        num,
        isMarked: false,
      }));

    this.board = bingoLines.map((line) => parseBingoLine(line));
  }

  printBoard = (prettyPrint: boolean = false) => {
    if (prettyPrint) {
      return this.board.map((row) => row.map((num) => num.num));
    }

    return this.board;
  };

  markNumber = (number: string) => {
    for (let i = 0; i < 5; i += 1) {
      for (let j = 0; j < 5; j += 1) {
        if (this.board[i][j].num === number) {
          this.board[i][j].isMarked = true;
          return this.hasBingo();
        }
      }
    }

    return false;
  }

  hasBingo = () => {
    for (let i = 0; i < 5; i += 1) {
      const rowHasBingo = this.board[i].every((bingoNum) => bingoNum.isMarked);
      const columnHasBingo = transposeMatrix(this.board)[i].every((bingoNum) => bingoNum.isMarked);

      if (rowHasBingo || columnHasBingo) {
        return true;
      }
    }

    return false;
  }

  sumOfUnmarkedNums = () => this.board.flat()
    .filter((bingoNum) => !bingoNum.isMarked)
    .reduce((acc, curr) => acc + Number(curr.num), 0);
}

const main = async () => {
  const bingoGame = await parseLines('04');
  const randomNums = bingoGame[0].split(',');
  let bingoBoards: BingoBoard[] = [];
  let hasFirstWinner = false;

  for (let i = 2; i < bingoGame.length; i += 6) {
    bingoBoards.push(new BingoBoard(bingoGame.slice(i, i + 5)));
  }

  for (let i = 0; i < randomNums.length; i += 1) {
    const winningBoardIndices: number[] = [];

    for (let j = 0; j < bingoBoards.length; j += 1) {
      if (bingoBoards[j].markNumber(randomNums[i])) {
        if (!hasFirstWinner) {
          console.log('Part 1:', bingoBoards[j].sumOfUnmarkedNums() * Number(randomNums[i]));

          hasFirstWinner = true;
        }

        if (bingoBoards.length === 1) {
          console.log('Part 2:', bingoBoards[0].sumOfUnmarkedNums() * Number(randomNums[i]));
          return;
        }

        winningBoardIndices.push(j);
      }
    }

    // Keep bingo boards that haven't won yet
    bingoBoards = bingoBoards.filter((_, index) => !winningBoardIndices.includes(index));
  }
};

main();
