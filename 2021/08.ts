import { parseLines } from '../helpers/helper';

// All lengths:
// 0: 6
// 1: 2
// 2: 5
// 3: 5
// 4: 4
// 5: 5
// 6: 6
// 7: 3
// 8: 8
// 9: 6

type sevenSegmentLengths = 2 | 3 | 4 | 5 | 6 | 7;
const UNIQUE_LENGTHS = [2, 4, 3, 7]; // 1, 4, 7, 8

const countUniqueNumbersInSignalOutput = (signalOutput: string) => {
  const outputSignals = signalOutput.split(' ');

  return outputSignals.filter((signal) => UNIQUE_LENGTHS.includes(signal.length)).length;
};

const getUniqueCharacter = (strings: string[]) => {
  const characterMap: { [key: string]: number } = {};

  for (let i = 0; i < strings.length; i += 1) {
    for (let j = 0; j < strings[i].length; j += 1) {
      const key = strings[i][j];
      if (!(key in characterMap)) {
        characterMap[key] = 0;
      }
      characterMap[key] += 1;
    }
  }

  return Object.entries(characterMap).filter(([_, value]) => value === 1).map(([ele]) => ele[0]);
};

const getUnionCharacter = (strings: string[]) => {
  const characterMap: { [key: string]: number } = {};

  for (let i = 0; i < strings.length; i += 1) {
    for (let j = 0; j < strings[i].length; j += 1) {
      const key = strings[i][j];
      if (!(key in characterMap)) {
        characterMap[key] = 0;
      }
      characterMap[key] += 1;
    }
  }

  return Object.entries(characterMap).filter(([_, value]) => value === strings.length).map(([ele]) => ele[0]);
};

const createMappingFromSignalInput = (signalInput: string[]) => {
  const segmentsOfLength: { [key: string]: string[] } = {
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
  };

  const positionMap: { [key: string]: string } = {};

  for (let i = 0; i < signalInput.length; i += 1) {
    const s = signalInput[i];
    segmentsOfLength[s.length as sevenSegmentLengths].push(s);
  }

  positionMap[0] = getUniqueCharacter(segmentsOfLength[2].concat(segmentsOfLength[3]))[0];
  positionMap[3] = getUnionCharacter(segmentsOfLength[4].concat(segmentsOfLength[5]))[0];
  positionMap[1] = getUniqueCharacter(getUniqueCharacter(segmentsOfLength[4].concat(segmentsOfLength[2])).concat(Object.values(positionMap)))[0];
  positionMap[6] = getUniqueCharacter(getUnionCharacter(segmentsOfLength[5]).concat(Object.values(positionMap)))[0];
  positionMap[5] = getUniqueCharacter(getUnionCharacter(segmentsOfLength[6]).concat(Object.values(positionMap)))[0];
  positionMap[2] = getUniqueCharacter(segmentsOfLength[2].concat(Object.values(positionMap)))[0];
  positionMap[4] = getUniqueCharacter(Object.values(positionMap).concat('abcdefg'))[0];

  return positionMap;
};

const createSegmentMapFromPositionMap = (positionMap: { [key: string]: string }) => {
  const segmentMap: { [key: string]: string } = {};
  segmentMap[[0, 1, 2, 4, 5, 6].map((key) => positionMap[key]).sort().join('')] = '0';
  segmentMap[[2, 5].map((key) => positionMap[key]).sort().join('')] = '1';
  segmentMap[[0, 2, 3, 4, 6].map((key) => positionMap[key]).sort().join('')] = '2';
  segmentMap[[0, 2, 3, 5, 6].map((key) => positionMap[key]).sort().join('')] = '3';
  segmentMap[[1, 2, 3, 5].map((key) => positionMap[key]).sort().join('')] = '4';
  segmentMap[[0, 1, 3, 5, 6].map((key) => positionMap[key]).sort().join('')] = '5';
  segmentMap[[0, 1, 3, 4, 5, 6].map((key) => positionMap[key]).sort().join('')] = '6';
  segmentMap[[0, 2, 5].map((key) => positionMap[key]).sort().join('')] = '7';
  segmentMap[[0, 1, 2, 3, 4, 5, 6].map((key) => positionMap[key]).sort().join('')] = '8';
  segmentMap[[0, 1, 2, 3, 5, 6].map((key) => positionMap[key]).sort().join('')] = '9';

  return segmentMap;
};

const main = async () => {
  const signalData = await parseLines('08.txt');
  let count = 0;

  console.log('Part 1:', signalData.reduce((acc, signal) => acc + countUniqueNumbersInSignalOutput(signal.split(' | ')[1]), 0));

  for (let i = 0; i < signalData.length; i += 1) {
    let numberString = '';
    const [signalInput, signalOutput] = signalData[i].split(' | ').map((signals) => signals.split(' '));
    const positionMap = createMappingFromSignalInput(signalInput);
    const segmentMap = createSegmentMapFromPositionMap(positionMap);

    for (let j = 0; j < signalOutput.length; j += 1) {
      numberString += segmentMap[signalOutput[j].split('').sort().join('')];
    }

    count += Number(numberString);
  }

  console.log('Part 2:', count);
};

main();
