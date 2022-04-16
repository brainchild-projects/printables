export const facCache = [1, 1];

export default function factorial(num: number) {
  if (num < 0) {
    throw Error(`Negative number ${num}`);
  }
  if (!facCache[num]) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    facCache[num] = num * factorial(num - 1);
  }
  return facCache[num];
}
