import { parseLines } from './helper';

const isTree = (x: number, y: number, map: string[]) => {
  const modNum = map[0].length;
  return map[y][x % modNum] === '#';
};

const countTreeHits = (run: number, rise: number, map: string[]) => {
  let counter = 0;
  let x = 0;

  for (let y = rise; y < map.length; y += rise) {
    x += run;

    if (isTree(x, y, map)) {
      counter += 1;
    }
  }

  return counter;
};

const main = async () => {
  const map = await parseLines('03');

  const multiSlopesCheck = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ].map(([run, rise]) => countTreeHits(run, rise, map))
    .reduce((acc, curr) => acc * curr);

  console.log(`Part 1: ${countTreeHits(3, 1, map)}`);
  console.log(`Part 2: ${multiSlopesCheck}`);
};

main();
