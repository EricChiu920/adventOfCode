import { parseGroupsSeparatedByEmptyLines } from './helper';

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

  return Object.values(yesAnswers).filter((answers) => answers === groupAnswer.length).length;
};

const main = async () => {
  const lines = await parseGroupsSeparatedByEmptyLines('06');

  console.log(lines
    .map(countYesInAnswers)
    .reduce((acc, curr) => acc + curr, 0));
};

main();
