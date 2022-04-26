import factorial from './factorial';
import { randomGenerator } from './RandomNumberGenerator';
import Range from './Range';
import tryByKey from './tryByKey';

type Pair = [a: number, b: number];

function computeMaxTries(aRange: Range, bRange: Range): number {
  return Math.max(
    factorial(aRange.to - aRange.from + 1) * factorial(bRange.to - bRange.from + 1),
    6,
  );
}

function flipRanges(k: number, aRange: Range, bRange: Range) {
  let range1: Range;
  let range2: Range;
  if (k % 2 === 0) {
    range1 = aRange;
    range2 = bRange;
  } else {
    range1 = bRange;
    range2 = aRange;
  }
  return { range1, range2 };
}

function getRandomPairFromRanges(k: number, aRange: Range, bRange: Range): [a: number, b: number] {
  const { range1, range2 } = flipRanges(k, aRange, bRange);
  const a = randomGenerator.integer(range1.to, range1.from);
  const b = randomGenerator.integer(range2.to, range2.from);
  return [a, b];
}

export default function randomPairsByRanges(aRange: Range, bRange: Range, count: number): Pair[] {
  const pairs: Pair[] = [];
  const maxTries = computeMaxTries(aRange, bRange);
  const limitedRetries = tryByKey(maxTries);
  let k = 0;
  while (pairs.length < count) {
    k += 1;
    const [a, b] = getRandomPairFromRanges(k, aRange, bRange);
    limitedRetries(`${a}:${b}`, () => {
      pairs.push([a, b]);
    });
  }
  return pairs;
}
