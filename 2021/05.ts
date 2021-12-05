import { parseLines } from '../helpers/helper';

type Points = {
  [key: string]: number;
};

const isDiagonal = (x1: number, y1: number, x2: number, y2: number) => Math.abs(x1 - x2) === Math.abs(y1 - y2);

const getDiagonalDelta = (x1: number, y1: number, x2: number, y2: number) => {
  if (x1 > x2) {
    if (y1 > y2) {
      return [-1, -1];
    }
    return [-1, 1];
  }
  if (y1 > y2) {
    return [1, -1];
  }
  return [1, 1];
};

const getCoordinates = (s: string): number[] => s.split(' -> ')
  .map((coordinate) => coordinate.split(','))
  .flat()
  .map(Number);

const main = async () => {
  const lines = await parseLines('05.txt');
  const points: Points = {};

  for (let i = 0; i < lines.length; i += 1) {
    const [x1, y1, x2, y2] = getCoordinates(lines[i]);

    if (x1 === x2) {
      const [min, max] = [y1, y2].sort((a, b) => a - b);

      for (let j = min; j <= max; j += 1) {
        const key = `${x1},${j}`;
        if (!(key in points)) {
          points[key] = 0;
        }

        points[key] += 1;
      }
    }

    if (y1 === y2) {
      const [min, max] = [x1, x2].sort((a, b) => a - b);

      for (let j = min; j <= max; j += 1) {
        const key = `${j},${y1}`;
        if (!(key in points)) {
          points[key] = 0;
        }

        points[key] += 1;
      }
    }

    if (isDiagonal(x1, y1, x2, y2)) {
      const [dx, dy] = getDiagonalDelta(x1, y1, x2, y2);
      const diff = Math.abs(x1 - x2);

      for (let j = 0; j <= diff; j += 1) {
        const key = `${x1 + (dx * j)},${y1 + (dy * j)}`;
        if (!(key in points)) {
          points[key] = 0;
        }

        points[key] += 1;
      }
    }
  }

  console.log(Object.values(points).filter((val) => val >= 2).length);
};

main();
