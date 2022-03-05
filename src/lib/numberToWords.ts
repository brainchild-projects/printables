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

const { floor } = Math;

function isInteger(n: number): boolean {
  return floor(n) === n;
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

// eslint-disable-next-line complexity
function numberToWords(number: number): string {
  const mapped = numbersMapping.get(number);
  if (typeof mapped === 'string') {
    return mapped;
  }

  let numberStr = '';
  if (isInteger(number)) {
    const hundredth = hundredsDigit(number);
    const hundreds = numbersMapping.get(hundredth);
    if (hundredth !== 0 && typeof hundreds === 'string') {
      numberStr += ` ${hundreds} hundred`;
    }

    const tenth = tensValue(number);
    const oneth = onesValue(number);

    if (tenth === 10 && oneth > 0) {
      numberStr += ` ${numbersMapping.get(tenth + oneth) ?? ''}`;
    } else {
      const tens = numbersMapping.get(tenth);
      if (tenth !== 0 && typeof tens === 'string') {
        numberStr += ` ${tens}`;
      }

      const ones = numbersMapping.get(oneth);
      if (oneth !== 0 && typeof ones === 'string') {
        numberStr += `${tenth !== 0 ? '-' : ' '}${ones}`;
      }
    }
  }
  return numberStr.trim();
}

export default numberToWords;
