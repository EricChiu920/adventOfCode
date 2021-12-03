import { parseLines } from '../helpers/helper';

const invertBinaryString = (s: string): string => s.split('').map((ele) => ((ele === '0') ? '1' : '0')).join('');

const getMostCommonBitInColumn = (report: string[], column: number): '0' | '1' => {
  let zero = 0;
  let one = 0;

  for (let i = 0; i < report.length; i += 1) {
    if (report[i][column] === '1') {
      one += 1;
    } else {
      zero += 1;
    }
  }

  return zero > one ? '0' : '1';
};

// eslint-disable-next-line no-unused-vars
const main = async () => {
  const diagnosticReports = await parseLines('03');
  let gamma = '';

  for (let column = 0; column < diagnosticReports[0].length; column += 1) {
    gamma += getMostCommonBitInColumn(diagnosticReports, column);
  }

  const epsilon = invertBinaryString(gamma);

  // Part 1
  // ---------------------------------
  console.log('Part 1:', parseInt(gamma, 2) * parseInt(epsilon, 2));

  // Part 2
  // ---------------------------------
  let o2Reports = [...diagnosticReports];
  let co2Reports = [...diagnosticReports];

  const reportsNotFound = o2Reports.length > 1 && co2Reports.length > 1;
  for (let column = 0; column < diagnosticReports[0].length && reportsNotFound; column += 1) {
    if (o2Reports.length > 1) {
      const mostCommonBit = getMostCommonBitInColumn(o2Reports, column);

      o2Reports = o2Reports.filter((o2Report) => o2Report[column] === mostCommonBit);
    }

    if (co2Reports.length > 1) {
      const leastCommonBit = invertBinaryString(getMostCommonBitInColumn(co2Reports, column));

      co2Reports = co2Reports.filter((co2Report) => co2Report[column] === leastCommonBit);
    }
  }

  console.log('Part 2:', parseInt(o2Reports[0], 2) * parseInt(co2Reports[0], 2));
};

main();
