import { countDigits } from '../../lib/math/commaNumberFormat';

const { floor } = Math;

interface PlaceValuesProblemOptions {
  digitPlaceValue: number,
}

const placeValueNames = [
  'ones',
  'tens',
  'hundreds',
  'thousands',
  'ten thousands',
  'hundred thousands',
  'millions',
];

type ForEachCallback = (number: number, isDigitPlaceValue: boolean, index: number) => void;
type MapCallback<T> = (number: number, isDigitPlaceValue: boolean, index: number) => T;

class PlaceValuesProblem {
  number: number;

  digitPlaceValue: number;

  static countWholeNumberDigits: (number: number) => number;

  constructor(number: number, { digitPlaceValue }: PlaceValuesProblemOptions) {
    this.number = number;
    const digitCount = this.wholeNumberDigitsCount();
    if (digitPlaceValue > digitCount) {
      throw Error(`The digitPlaceValue "${digitPlaceValue}" for the number "${number}" is more than the digit count of "${digitCount}".`);
    }
    this.digitPlaceValue = digitPlaceValue;
  }

  ones(): number {
    return this.number % 10;
  }

  tens(): number {
    return floor((this.number / 10) % 10);
  }

  hundreds(): number {
    return floor((this.number / 100) % 10);
  }

  thousands(): number {
    return floor((this.number / 1000) % 10);
  }

  digitPlaceValueName(): string {
    return placeValueNames[this.digitPlaceValue - 1];
  }

  wholeNumberDigitsCount(): number {
    return PlaceValuesProblem.countWholeNumberDigits(this.number);
  }

  forEachDigit(callback: ForEachCallback): void {
    const digitCount = this.wholeNumberDigitsCount();
    this.digitsFromGreatest().forEach((n, i) => {
      callback(n, digitCount - i === this.digitPlaceValue, i);
    });
  }

  mapDigits<T>(callBack: MapCallback<T>): Array<T> {
    const collection: Array<T> = [];
    this.forEachDigit((number, isDigitPlaceValue, i) => {
      collection.push(callBack(number, isDigitPlaceValue, i));
    });
    return collection;
  }

  digitsFromGreatest(): Array<number> {
    return this.number.toString().split('').map(Number.parseFloat);
  }
}

PlaceValuesProblem.countWholeNumberDigits = countDigits;

export default PlaceValuesProblem;
