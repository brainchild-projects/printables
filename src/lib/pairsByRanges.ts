import NumberPair from './NumberPair.js';
import { randomGenerator } from './RandomNumberGenerator.js';
import randomPairsByRanges from './randomPairsByRanges.js';
import Range from './Range.js';
import roundRobinPairsByRanges from './roundRobinPairsByRanges.js';

export default function pairsByRanges(aRange: Range, bRange: Range, count: number): NumberPair[] {
  const minRange = Math.min(
    (aRange.to - aRange.from + 1),
    (bRange.to - bRange.from + 1),
  );
  if (minRange > 20) {
    return randomPairsByRanges(aRange, bRange, count);
  }

  const generated: NumberPair[] = [];
  const possiblePairs = roundRobinPairsByRanges(aRange, bRange);
  while (generated.length < count) {
    const pairBag = possiblePairs.slice(0);
    for (let i = 0; i < pairBag.length && generated.length < count; i++) {
      const pair = pairBag.splice(randomGenerator.integer(pairBag.length - 1), 1)[0];
      generated.push(pair);
    }
  }
  return generated;
}
