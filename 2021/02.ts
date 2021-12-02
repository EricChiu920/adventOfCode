import { parseLines } from '../helpers/helper';

const main = async () => {
  const directions = await parseLines('02');

  let x = 0;
  let depth = 0;
  let aim = 0;
  for (let i = 0; i < directions.length; i += 1) {
    const [direction, distanceTemp] = directions[i].split(' ');
    const distance = Number(distanceTemp);

    // Part 1
    // ---------------------------------
    // switch (direction) {
    //   case 'forward':
    //     x += distance;
    //     break;
    //   case 'up':
    //     depth -= distance;
    //     break;
    //   case 'down':
    //     depth += distance;
    //     break;
    //   default:
    //     break;
    // }

    // Part 2
    // ---------------------------------
    switch (direction) {
      case 'forward':
        x += distance;
        depth += aim * distance;
        break;
      case 'up':
        aim -= distance;
        break;
      case 'down':
        aim += distance;
        break;
      default:
        break;
    }
  }

  console.log(x * depth);
};

main();
