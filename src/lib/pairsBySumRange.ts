import NumberPair from './NumberPair';
import { randomGenerator } from './RandomNumberGenerator';
import Range from './Range';
import tryByKey from './tryByKey';

export default function pairsBySumRange(sumRange: Range, count: number): NumberPair[] {
  const pairs: NumberPair[] = [];
  const limitedRetries = tryByKey();
  for (let i = 0; pairs.length < count; i++) {
    const sum = randomGenerator.integer(sumRange.to, sumRange.from);
    const addendA = randomGenerator.integer(sumRange.to, 0);
    limitedRetries([sum, addendA], () => {
      pairs.push([addendA, sum - addendA]);
    });
  }

  return pairs;
}
