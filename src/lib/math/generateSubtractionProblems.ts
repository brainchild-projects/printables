import { randomGenerator } from '../RandomNumberGenerator';
import tryByKey from '../tryByKey';
import Subtraction from './Subtraction';
import Range from '../Range';
import pairsBySumRange from '../pairsBySumRange';

export type ProblemGeneration = 'minuend' | 'subtrahend and difference';

export interface SubtractionProblemsProps {
  count: number;
  problemGeneration: ProblemGeneration;
  minuend: Range;
  subtrahend: Range;
  difference: Range;
}

export function generateProblemsFromMinuend(minuendRange: Range, count: number): Subtraction[] {
  const pairs = pairsBySumRange(minuendRange, count);
  return pairs.map(([subtrahend, difference]) => Subtraction.create({ subtrahend, difference }));
}

export function generateProblemsFromSubAndDiff(
  subRange: Range,
  diffRange: Range,
  count: number,
): Subtraction[] {
  const problems: Subtraction[] = [];
  const limitedRetries = tryByKey();
  for (let i = 0; problems.length < count; i++) {
    const subtrahend = randomGenerator.integer(subRange.to, subRange.from);
    const difference = randomGenerator.integer(diffRange.to, diffRange.from);
    limitedRetries([subtrahend, difference], () => {
      problems.push(Subtraction.create({ subtrahend, difference }));
    });
  }
  return problems;
}

export default function generateSubtractionProblems({
  count, problemGeneration, minuend, subtrahend, difference,
}: SubtractionProblemsProps): Array<Subtraction> {
  if (problemGeneration === 'minuend') {
    return generateProblemsFromMinuend(minuend, count);
  }
  return generateProblemsFromSubAndDiff(subtrahend, difference, count);
}
