const numbersMapping: Map<number, string> = new Map([
  [0, 'zero'],
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
  [4, 'four'],
  [5, 'five'],
  [6, 'six'],
  [7, 'seven'],
  [8, 'eight'],
  [9, 'nine'],
  [10, 'ten'],
  [11, 'eleven'],
  [12, 'twelve'],
  [13, 'thirteen'],
  [14, 'fourteen'],
  [15, 'fifteen'],
  [16, 'sixteen'],
  [17, 'seventeen'],
  [18, 'eighteen'],
  [19, 'nineteen'],
  [20, 'twenty'],
  [30, 'thirty'],
  [40, 'forty'],
  [50, 'fifty'],
  [60, 'sixty'],
  [70, 'seventy'],
  [80, 'eighty'],
  [90, 'ninety'],
]);

const scales = [
  'thousand',
  'million',
  'billion',
  'trillion',
  'quadrillion',
];

const { floor, abs } = Math;

function isInteger(n: number): boolean {
  return floor(n) === n;
}

export function splitBy3s(n: number): number[] {
  let current = abs(n);
  const numbers = [];
  let i = 0;
  while (current > 999 && i < 100) {
    const block = floor(current % 1000);
    numbers.unshift(block);
    current = floor(current / 1000);
    i += 1;
  }
  numbers.unshift(current);
  return numbers;
}

function hundredsDigit(n: number): number {
  return floor((n / 100) % 100);
}

function tensValue(n: number): number {
  return floor((n / 10) % 10) * 10;
}

function onesValue(n: number): number {
  return n % 10;
}

function hundredsPart(number: number): string {
  const hundredth = hundredsDigit(number);
  const hundreds = numbersMapping.get(hundredth);
  if (hundredth !== 0 && typeof hundreds === 'string') {
    return ` ${hundreds} hundred`;
  }
  return '';
}

function mappedOrEmpty(n: number): string {
  return numbersMapping.get(n) ?? '';
}

function isBetween11And19(n: number) {
  return n > 10 && n < 20;
}

function getTensPart(tenth: number): string {
  const tens = numbersMapping.get(tenth);
  if (tenth !== 0 && typeof tens === 'string') {
    return ` ${tens}`;
  }
  return '';
}

function getOnesPart(tenth: number, oneth: number): string {
  const ones = numbersMapping.get(oneth);
  if (oneth !== 0 && typeof ones === 'string') {
    return `${tenth !== 0 ? '-' : ' '}${ones}`;
  }

  return '';
}

function getTensCombination(tenth: number, oneth: number): string {
  return getTensPart(tenth) + getOnesPart(tenth, oneth);
}

function hundredsBasic(number: number): string {
  let numberStr = '';
  numberStr += hundredsPart(number);

  const tenth = tensValue(number);
  const oneth = onesValue(number);

  if (isBetween11And19(tenth + oneth)) {
    numberStr += ` ${mappedOrEmpty(tenth + oneth)}`;
  } else {
    numberStr += getTensCombination(tenth, oneth);
  }
  return numberStr.trim();
}

function numberToWordsUnmapped(number: number): string {
  const sections = splitBy3s(number);
  let numberStr = '';
  const len = sections.length - 1;
  for (let i = 0; i < len; i++) {
    const nbase = hundredsBasic(sections[i]);
    if (nbase !== '') {
      const scale = scales[len - 1 - i];
      numberStr += `${nbase} ${scale} `;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return (`${numberStr}${hundredsBasic(sections.pop()!)}`).trim();
}

function numberToWords(number: number): string {
  if (!isInteger(number)) return '';
  return numbersMapping.get(number) ?? numberToWordsUnmapped(number);
}

export default numberToWords;
