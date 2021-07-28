import NumberGenerator, { MathRandom } from './NumberGenerator';

describe('integer()', () => {
  let randomFn: MathRandom;
  let randomFnResult: number;
  let generator: NumberGenerator;

  beforeEach(() => {
    randomFn = jest.fn(() => randomFnResult);
    generator = new NumberGenerator(randomFn);
  });

  describe('errors', () => {
    it('throws error when max is less than minimum', () => {
      expect(() => {
        generator.integer(5, 6);
      }).toThrowError();
    });
  });

  [
    {
      max: 4,
      min: undefined,
      rand: 0.5,
      expected: 2,
    },
    {
      max: 5,
      min: undefined,
      rand: 0.5,
      expected: 3,
    },
    {
      max: 6,
      min: undefined,
      rand: 0.5,
      expected: 3,
    },
    {
      max: 6,
      min: 2,
      rand: 0.5,
      expected: 4,
    },
    {
      max: 0,
      min: 0,
      rand: 0.99999,
      expected: 0,
    },
    {
      max: 6,
      min: undefined,
      rand: 0.99999,
      expected: 6,
    },
  ].forEach(({
    max, min, rand, expected,
  }) => {
    describe(`When max is ${max}, min is ${min === undefined ? 'undefined' : min.toString()}, and random function returns ${rand}`, () => {
      let answer: number;

      beforeEach(() => {
        randomFnResult = rand;
        answer = generator.integer(max, min);
      });

      it(`returns ${expected}`, () => {
        expect(answer).toEqual(expected);
      });
    });
  });
});
