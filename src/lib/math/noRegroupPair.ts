import { randomGenerator } from '../RandomNumberGenerator';

export function singleDigitNRPair(n: number): number {
  const max = 9 - n;
  return randomGenerator.integerBiasLess(max, 0);
}

function getDigits(n: number): number[] {
  return n.toString()
    .split('')
    .map((digit) => parseFloat(digit));
}

function noRegroupPairBasic(n: number): number {
  const digits = getDigits(n);
  return parseFloat(
    digits
      .map((digit) => singleDigitNRPair(digit))
      .join(''),
  );
}

function noRegroupPairWithMax(n: number, max: number): number {
  const maxRetries = 10;
  let generated = noRegroupPairBasic(n);
  for (let i = 0; i < maxRetries; i++) {
    if (generated <= max) {
      break;
    }
    generated = noRegroupPairBasic(n);
  }
  return generated;
}

export default function noRegroupPair(n: number, max?: number): number {
  if (max !== undefined) {
    return noRegroupPairWithMax(n, max);
  }
  return noRegroupPairBasic(n);
}
