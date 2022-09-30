import PlaceValuesProblem from './PlaceValuesProblem';

interface TestItem {
  number: number;
  digitPlaceValue: number;
  expectedOnes: number;
  expectedTens: number;
  expectedHundreds: number;
  expectedThousands?: number;
  expectedDigitPlaceValueName: string;
  expectedNumberOfDigits: number;
}

describe('PlaceValuesProblem', () => {
  describe('Basics', () => {
    const items: Array<TestItem> = [
      {
        number: 8,
        digitPlaceValue: 1,
        expectedOnes: 8,
        expectedTens: 0,
        expectedHundreds: 0,
        expectedDigitPlaceValueName: 'ones',
        expectedNumberOfDigits: 1,
      },
      {
        number: 0,
        digitPlaceValue: 1,
        expectedOnes: 0,
        expectedTens: 0,
        expectedHundreds: 0,
        expectedDigitPlaceValueName: 'ones',
        expectedNumberOfDigits: 1,
      },
      {
        number: 12,
        digitPlaceValue: 2,
        expectedOnes: 2,
        expectedTens: 1,
        expectedHundreds: 0,
        expectedDigitPlaceValueName: 'tens',
        expectedNumberOfDigits: 2,
      },
      {
        number: 98,
        digitPlaceValue: 2,
        expectedOnes: 8,
        expectedTens: 9,
        expectedHundreds: 0,
        expectedDigitPlaceValueName: 'tens',
        expectedNumberOfDigits: 2,
      },
      {
        number: 156,
        digitPlaceValue: 3,
        expectedOnes: 6,
        expectedTens: 5,
        expectedHundreds: 1,
        expectedDigitPlaceValueName: 'hundreds',
        expectedNumberOfDigits: 3,
      },
      {
        number: 555,
        digitPlaceValue: 1,
        expectedOnes: 5,
        expectedTens: 5,
        expectedHundreds: 5,
        expectedDigitPlaceValueName: 'ones',
        expectedNumberOfDigits: 3,
      },
      {
        number: 999,
        digitPlaceValue: 3,
        expectedOnes: 9,
        expectedTens: 9,
        expectedHundreds: 9,
        expectedDigitPlaceValueName: 'hundreds',
        expectedNumberOfDigits: 3,
      },
      {
        number: 1000,
        digitPlaceValue: 4,
        expectedOnes: 0,
        expectedTens: 0,
        expectedHundreds: 0,
        expectedThousands: 1,
        expectedDigitPlaceValueName: 'thousands',
        expectedNumberOfDigits: 4,
      },
    ];

    items.forEach((item) => {
      describe(`for number \`${item.number}\` and digitPlaceValue of \`${item.digitPlaceValue}\``, () => {
        let problem: PlaceValuesProblem;
        beforeEach(() => {
          problem = new PlaceValuesProblem(item.number, { digitPlaceValue: item.digitPlaceValue });
        });

        it('returns correct ones place', () => {
          expect(problem.ones()).toEqual(item.expectedOnes);
        });

        it('returns correct tens place', () => {
          expect(problem.tens()).toEqual(item.expectedTens);
        });

        it('returns correct hundreds place', () => {
          expect(problem.hundreds()).toEqual(item.expectedHundreds);
        });

        it('returns correct thousands place', () => {
          expect(problem.thousands()).toEqual(item.expectedThousands ?? 0);
        });

        it('returns correct digit place value name', () => {
          expect(problem.digitPlaceValueName()).toEqual(item.expectedDigitPlaceValueName);
        });

        it('returns correct number of digits', () => {
          expect(problem.wholeNumberDigitsCount()).toEqual(item.expectedNumberOfDigits);
        });
      });
    });
  });

  describe('#forEachDigit()', () => {
    const items = [
      {
        number: 0, digits: [0], digitPlaceValue: 1, place: [true],
      },
      {
        number: 9, digits: [9], digitPlaceValue: 1, place: [true],
      },
      {
        number: 10, digits: [1, 0], digitPlaceValue: 2, place: [true, false],
      },
      {
        number: 376, digits: [3, 7, 6], digitPlaceValue: 1, place: [false, false, true],
      },
    ];

    items.forEach(({
      number, digits, digitPlaceValue, place,
    }) => {
      describe(`For the number "${number}"`, () => {
        let problem: PlaceValuesProblem;
        beforeEach(() => {
          problem = new PlaceValuesProblem(number, {
            digitPlaceValue,
          });
        });

        it(`digits is/are [${digits.join(', ')}]`, () => {
          const digitsFound: Array<number> = [];
          problem.forEachDigit((current) => {
            digitsFound.push(current);
          });
          expect(digitsFound).toEqual(digits);
        });

        it(`gets sequence places right [${place.join(', ')}]`, () => {
          const placesFound: Array<boolean> = [];
          problem.forEachDigit((_, current) => {
            placesFound.push(current);
          });
          expect(placesFound).toEqual(place);
        });
      });
    });
  });

  describe('Errors', () => {
    describe('when digitPlaceValue is more than the number of digits', () => {
      it('throws error', () => {
        expect(() => {
          // eslint-disable-next-line no-new
          new PlaceValuesProblem(25, { digitPlaceValue: 3 });
        }).toThrow('The digitPlaceValue "3" for the number "25" is more than the digit count of "2".');
      });
    });
  });
});
