import { parseLines } from './helper';

const getSeatId = (row: number, column: number) => row * 8 + column;

const findSeatFromBoardingPass = (boardingPass: string): [number, number] => {
  const rowString = boardingPass.slice(0, 7);
  const columnString = boardingPass.slice(7);
  let row: number[] = Array.from(Array(128).keys());
  let column: number[] = Array.from(Array(8).keys());

  for (let i = 0; i < rowString.length; i += 1) {
    const halfIndex = Math.floor(row.length / 2);
    const lower = row.slice(0, halfIndex);
    const upper = row.slice(halfIndex);

    if (rowString[i] === 'F') {
      row = lower;
    } else {
      row = upper;
    }
  }

  for (let i = 0; i < columnString.length; i += 1) {
    const halfIndex = Math.floor(column.length / 2);
    const lower = column.slice(0, halfIndex);
    const upper = column.slice(halfIndex);

    if (columnString[i] === 'L') {
      column = lower;
    } else {
      column = upper;
    }
  }

  return [row[0], column[0]];
};

const findMySeat = (allSeatIds: number[]) => {
  const minSeat = 7;
  const maxSeat = 1011;

  for (let i = 0; i < allSeatIds.length - 1; i += 1) {
    const seatId = allSeatIds[i];
    const nextSeatId = allSeatIds[i + 1];

    if (nextSeatId === seatId + 2 && seatId > minSeat && seatId < maxSeat) {
      return seatId + 1;
    }
  }

  return -1;
};

const main = async () => {
  const boardingPasses: string[] = await parseLines('05');

  const allSeatIds = boardingPasses.map((boardingPass) => getSeatId(...findSeatFromBoardingPass(boardingPass)));
  console.log(Math.max(...allSeatIds));
  console.log(findMySeat(allSeatIds.sort((a, b) => a - b)));
};

main();
