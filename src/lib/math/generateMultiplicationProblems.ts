import Multiplication from './Multiplication';
import Range from '../Range';
import tryByKey from '../tryByKey';
import { randomGenerator } from '../RandomNumberGenerator';
import NumberPair from '../NumberPair';

export type ProblemGeneration = 'factors' | 'product';

export interface MultiplicationProblemsProps {
  count: number;
  problemGeneration: ProblemGeneration;
  multiplier: Range;
  multiplicand: Range;
  product: Range;
}

export function generateProblemsFromFactors(multiplierRange: Range, multiplicandRange: Range, count: number): Multiplication[] {
  const problems: Multiplication[] = [];
  const limitedRetries = tryByKey();
  for (let i = 0; problems.length < count; i++) {
    const multiplier = randomGenerator.integer(multiplierRange.to, multiplierRange.from);
    const multiplicand = randomGenerator.integer(multiplicandRange.to, multiplicandRange.from);
    limitedRetries([multiplier, multiplicand], () => {
      problems.push(Multiplication.create(multiplier, multiplicand));
    });
  }
  return problems;
}

function pairsByProductRange(productRange: Range, count: number): NumberPair[] {
  const pairs: NumberPair[] = [];
  const limitedRetries = tryByKey();
  for (let i = 0; pairs.length < count; i++) {
    const product = randomGenerator.integer(productRange.to, productRange.from);
    const multiplier = randomGenerator.integer(productRange.to, 1);
    limitedRetries([product, multiplier], () => {
      pairs.push([multiplier, product / multiplier]);
    });
  }
  return pairs;
}

export function generateProblemsFromProduct(productRange: Range, count: number): Multiplication[] {
  const pairs = pairsByProductRange(productRange, count);
  return pairs.map(([multiplier, multiplicand]) => Multiplication.create(multiplier, multiplicand));
}


export default function generateMultiplicationProblems({
  count, problemGeneration, multiplier, multiplicand, product,
}: MultiplicationProblemsProps): Array<Multiplication> {
  if (problemGeneration === 'product') {
    return generateProblemsFromProduct(product, count);
  }

  return generateProblemsFromFactors(multiplier, multiplicand, count);
}
