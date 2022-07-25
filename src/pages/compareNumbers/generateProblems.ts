import { maxFromMagnitude } from '../../lib/math/magnitude';
import { randomGenerator, scaledRoulette, ScalingMap } from '../../lib/RandomNumberGenerator';
import CompareNumbersData, { NumberComparison } from './CompareNumbersData';
import CompareNumbersProblem from './CompareNumbersProblem';

const comparisonWeights: ScalingMap<NumberComparison> = new Map([
  ['<', 2],
  ['>', 2],
  ['=', 1],
]);

export default function generateProblems({
  magnitude, count,
}: CompareNumbersData): CompareNumbersProblem[] {
  const problems: CompareNumbersProblem[] = [];
  const max = maxFromMagnitude(magnitude);
  for (let i = 0; i < count; i++) {
    const comparison = scaledRoulette(comparisonWeights);
    let left: number;
    let right: number;
    if (comparison === '>') {
      left = randomGenerator.integer(max, 1);
      right = randomGenerator.integer(left - 1);
    } else if (comparison === '<') {
      left = randomGenerator.integer(max - 1);
      right = randomGenerator.integer(max, left + 1);
    } else {
      left = randomGenerator.integer(max);
      right = left;
    }
    problems.push(new CompareNumbersProblem(left, right));
  }

  return problems;
}
