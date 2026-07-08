import { magnitudeDigits, maxFromMagnitude } from '../../lib/math/magnitude.js';
import mutateNumber from '../../lib/mutateNumber.js';
import { randomGenerator } from '../../lib/RandomNumberGenerator.js';
import shuffle from '../../lib/shuffle.js';
import tryByKey from '../../lib/tryByKey.js';
import NumbersToWordsData from './NumbersToWordsData.js';

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
  const magNumber = magnitudeDigits(magnitude);

  const problems: NumToWordsProblem[] = [];
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
