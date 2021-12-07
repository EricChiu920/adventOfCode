import { parseLines, logAsyncExecutionTime } from '../helpers/helper';

const main = async () => {
  const horizontalPositionsData = await parseLines('07.txt');
  const crabHorizontalPositions = horizontalPositionsData[0]
    .split(',')
    .map((position) => Number(position));

  const min = Math.min(...crabHorizontalPositions);
  const max = Math.max(...crabHorizontalPositions);
  let leastFuel = Infinity;

  for (let i = min; i <= max; i += 1) {
    let fuelCost = 0;

    for (let j = 0; j < crabHorizontalPositions.length; j += 1) {
      const distance = Math.abs(crabHorizontalPositions[j] - i);
      fuelCost += (distance * (distance + 1)) / 2;
      if (fuelCost > leastFuel) {
        break;
      }
    }

    if (fuelCost < leastFuel) {
      leastFuel = fuelCost;
    }
  }

  console.log(leastFuel);
};

logAsyncExecutionTime(main);
