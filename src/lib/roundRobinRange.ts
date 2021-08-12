type Pair = [a: number, b: number];
type Range = { from: number, to: number };
export default function roundRobinRange(aRange: Range, bRange: Range): Pair[] {
  const pairs: Pair[] = [];
  const found = new Set<string>();
  for (let i = aRange.from; i <= aRange.to; i++) {
    for (let j = bRange.from; j <= bRange.to; j++) {
      const keyA = `${i}:${j}`;
      if (!found.has(keyA)) {
        pairs.push([i, j]);
        found.add(keyA);
      }
      const keyB = `${j}:${i}`;
      if (!found.has(keyB)) {
        pairs.push([j, i]);
        found.add(keyB);
      }
    }
  }
  return pairs;
}
