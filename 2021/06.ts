/* eslint-disable no-param-reassign */
import { parseLines } from '../helpers/helper';

type FishTimer = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type FishCounter = {
  0: number;
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
  6: number;
  7: number;
  8: number;
};

const INITIAL_FISH_COUNTER: FishCounter = {
  0: 0,
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
};

const simulateDay = (lanternFishList: FishCounter) => {
  const newFishList: FishCounter = { ...INITIAL_FISH_COUNTER };

  const newFish = lanternFishList[0];
  for (let i = 0; i <= 7; i += 1) {
    newFishList[i as FishTimer] = lanternFishList[(i + 1) as FishTimer];
  }

  newFishList[6] += newFish;
  newFishList[8] = newFish;

  return newFishList;
};

const simulateMain = async (totalDays: number) => {
  const lanternFishData = await parseLines('06.txt');
  const lanternFishList = lanternFishData[0].split(',').map((timer) => Number(timer));
  const calculatedFish: { [key: string]: number; } = {};

  for (let i = 1; i <= 5; i += 1) {
    let fishList: FishCounter = { ...INITIAL_FISH_COUNTER };
    fishList[i as FishTimer] = 1;

    for (let day = 1; day <= totalDays; day += 1) {
      fishList = simulateDay(fishList);
    }
    calculatedFish[i] = Object.values(fishList).reduce((acc, curr) => acc + curr, 0);
  }

  console.log(lanternFishList.reduce((acc, timer) => acc + calculatedFish[timer], 0));
};

simulateMain(256);
