const { floor, log10 } = Math;

export function countDigits(n: number): number {
  if (n === 0) {
    return 1;
  }
  return floor(log10(n)) + 1;
}

export function shouldAddComma(n: number, index: number): boolean {
  const length = countDigits(n);
  return index < (length - 1) && (length - index - 1) % 3 === 0;
}

export default function commaNumberFormat(n: number) {
  const nStr = n.toString();
  return nStr
    .split('')
    .map((digit, index) => (
      shouldAddComma(n, index) ? `${digit},` : digit
    ))
    .join('');
}
