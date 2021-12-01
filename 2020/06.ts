import { parseGroupsSeparatedByEmptyLines } from '../helpers/helper';

const countYesInAnswers = (groupAnswer: string[]) => {
  const yesAnswers: { [key: string]: number } = {};

  for (let i = 0; i < groupAnswer.length; i += 1) {
    const answers = groupAnswer[i];

    for (let j = 0; j < answers.length; j += 1) {
      const yes = answers[j];

      if (yes in yesAnswers) {
        yesAnswers[yes] += 1;
      } else {
        yesAnswers[yes] = 1;
      }
    }
  }

  return yesAnswers;
};

const main = async () => {
  const lines = await parseGroupsSeparatedByEmptyLines('06');

  const groupAnswersArr = lines
    .map(countYesInAnswers);

  const partOneAnswer = groupAnswersArr
    .map((groupAnswers) => Object.keys(groupAnswers).length)
    .reduce((acc, curr) => acc + curr);

  const partTwoAnswer = groupAnswersArr
    .map((groupAnswers, i) => {
      const group = lines[i];
      return Object.values(groupAnswers).filter((answersCount) => answersCount === group.length).length;
    })
    .reduce((acc, curr) => acc + curr);

  console.log('Part One:', partOneAnswer);
  console.log('Part Two:', partTwoAnswer);
};

main();
