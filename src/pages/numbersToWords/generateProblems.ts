import { magNFromMagnitude, maxFromMagnitude } from '../../lib/math/magnitude';
import mutateNumber from '../../lib/mutateNumber';
import { randomGenerator } from '../../lib/RandomNumberGenerator';
import shuffle from '../../lib/shuffle';
import tryByKey from '../../lib/tryByKey';
import NumbersToWordsData from './NumbersToWordsData';

export interface NumToWordsProblem {
  number: number;
  choices: number[];
}

function generateChoices(number: number): number[] {
  const choices: Set<number> = new Set([number]);
  while (choices.size < 4) {
    choices.add(mutateNumber(number));
  }
  const shuffled = shuffle(Array.from(choices));
  return shuffled;
}

function choiceProblem(number: number): NumToWordsProblem {
  const choices: number[] = generateChoices(number);
  return { number, choices };
}

function fillInTheBlankProblem(number: number): NumToWordsProblem {
  return { number, choices: [] };
}

export default function generateProblems({
  count, magnitude, problemType,
}: NumbersToWordsData): NumToWordsProblem[] {
  const max = maxFromMagnitude(magnitude);
  const magNumber = magNFromMagnitude(magnitude);

  const problems: Array<NumToWordsProblem> = [];
  const limitedRetries = tryByKey(max);

  while (problems.length < count) {
    const number = randomGenerator.stepMagnitude(magNumber);
    limitedRetries(number, () => {
      problems.push(
        (problemType === 'blanks' ? fillInTheBlankProblem : choiceProblem)(number),
      );
    });
  }

  return problems;
}
