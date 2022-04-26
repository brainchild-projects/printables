import Range from './Range';

type Pair = [a: number, b: number];

export default function roundRobinPairsByRanges(aRange: Range, bRange: Range): Pair[] {
  const pairs: Pair[] = [];
  const found = new Set<string>();
  const pusher = (a: number, b: number) => {
    const key = `${a}:${b}`;
    if (!found.has(key)) {
      pairs.push([a, b]);
      found.add(key);
    }
  };

  for (let i = aRange.from; i <= aRange.to; i++) {
    for (let j = bRange.from; j <= bRange.to; j++) {
      pusher(i, j);
      pusher(j, i);
    }
  }
  return pairs;
}
