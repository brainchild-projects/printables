import randomElement from './randomElement';
import { randomGenerator } from './RandomNumberGenerator';
import shuffle from './shuffle';

// TODO: Make these work for numbers with decimal places
function toDigits(n: number): string[] {
  return n.toString().split('');
}

function insertDigit(n: number): number {
  const nDigits = toDigits(n);
  const insertAt = randomGenerator.integer(nDigits.length - 1);
  nDigits.splice(insertAt, 0, randomGenerator.integer(9).toString());
  return parseFloat(nDigits.join(''));
}

function removeDigitOrRandom(n: number): number {
  const nDigits = toDigits(n);
  if (nDigits.length > 1) {
    const removeAt = randomGenerator.integer(nDigits.length - 1);
    nDigits.splice(removeAt, 1);
    return parseFloat(nDigits.join(''));
  }
  return randomGenerator.integer(n);
}

function replaceDigit(n: number): number {
  const nDigits = toDigits(n);
  const replaceAt = randomGenerator.integer(nDigits.length - 1);
  nDigits.splice(replaceAt, 1, randomGenerator.integer(9).toString());
  return parseFloat(nDigits.join(''));
}

function shuffleDigits(n: number): number {
  return parseFloat(shuffle(toDigits(n)).join(''));
}

function numberInRange(n: number): number {
  const digitLength = (n.toString()).replace('.', '').length;
  return randomGenerator.integer((10 ** (digitLength)) - 1);
}

const mangleFunctions = [
  insertDigit,
  removeDigitOrRandom,
  replaceDigit,
  shuffleDigits,
  numberInRange,
];

export default function mutateNumber(n: number): number {
  return randomElement(mangleFunctions)(n);
}
