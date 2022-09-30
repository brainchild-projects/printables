import ModRandomNumberGenerator from './ModRandomNumberGenerator';

describe('ModRandomNumberGenerator', () => {
  describe('integer()', () => {
    let generator: ModRandomNumberGenerator;
    beforeEach(() => {
      generator = new ModRandomNumberGenerator();
    });

    describe('errors', () => {
      it('throws error when max is less than minimum', () => {
        expect(() => {
          generator.integer(5, 6);
        }).toThrow('max (5) should not be less than min (6)');
      });
    });

    describe('when generating 100 numbers with 100 max-min difference', () => {
      const numbers: number[] = [];

      beforeEach(() => {
        for (let i = 0; i < 100; i++) {
          numbers.push(generator.integer(150, 51));
        }
      });

      it('generates unique numbers', () => {
        // Basically just a shuffled version of min-max
        const uniques = new Set(numbers);
        expect(uniques.size).toEqual(numbers.length);
      });

      it('generates numbers within min max', () => {
        const outOfRange = numbers.filter((n) => n < 51 || n > 150);
        expect(outOfRange.length).toEqual(0);
      });
    });
  });
});
