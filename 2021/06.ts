/* eslint-disable no-param-reassign */
import { parseLines } from '../helpers/helper';

type FishTimer = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

const main = async (totalDays: number) => {
  const lanternFishData = await parseLines('06.txt');
  const lanternFishList = lanternFishData[0].split(',').map((timer) => Number(timer));
  const calculatedFish = {
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

  for (let i = 0; i < lanternFishList.length; i += 1) {
    calculatedFish[lanternFishList[i] as FishTimer] += 1;
  }

  for (let day = 1; day <= totalDays; day += 1) {
    const newFish = calculatedFish[0];
    for (let i = 0; i < 8; i += 1) {
      calculatedFish[i as FishTimer] = calculatedFish[(i + 1) as FishTimer];
    }

    calculatedFish[6] += newFish;
    calculatedFish[8] = newFish;
  }

  console.log(Object.values(calculatedFish).reduce((acc, fish) => acc + fish, 0));
};

main(256);
