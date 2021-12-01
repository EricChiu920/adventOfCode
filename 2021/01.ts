import { parseLines } from '../helpers/helper';

const difference = (a: number, b: number): number => b - a;

// eslint-disable-next-line no-unused-vars
const mainPart1 = async () => {
  const depths: string[] = await parseLines('01');
  let increases = 0;

  for (let i = 0; i < depths.length - 1; i += 1) {
    const currentNum = Number(depths[i]);
    const nextNum = Number(depths[i + 1]);

    if (difference(currentNum, nextNum) > 0) {
      increases += 1;
    }
  }

  console.log(increases);
};

const main = async () => {
  const depths: string[] = await parseLines('01');
  let increases = 0;
  let currentSum = Infinity;

  for (let i = 0; i < depths.length - 2; i += 1) {
    const first = Number(depths[i]);
    const second = Number(depths[i + 1]);
    const third = Number(depths[i + 2]);

    const newSum = [first, second, third].reduce((acc, curr) => acc + curr, 0);
    if (newSum > currentSum) {
      increases += 1;
    }

    currentSum = newSum;
  }

  console.log(increases);
};

main();
