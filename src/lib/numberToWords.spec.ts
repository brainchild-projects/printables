/* eslint-disable no-underscore-dangle */
import numberToWords from './numberToWords';

interface TestData {
  input: number;
  expected: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
function _t(input: number, expected: string): TestData {
  return { input, expected };
}

describe('numberToWords', () => {
  const testData: Array<TestData> = [
    _t(0, 'zero'),
    _t(1, 'one'),
    _t(2, 'two'),
    _t(3, 'three'),
    _t(4, 'four'),
    _t(5, 'five'),
    _t(6, 'six'),
    _t(7, 'seven'),
    _t(8, 'eight'),
    _t(9, 'nine'),
    _t(10, 'ten'),
    _t(11, 'eleven'),
    _t(12, 'twelve'),
    _t(13, 'thirteen'),
    _t(14, 'fourteen'),
    _t(15, 'fifteen'),
    _t(16, 'sixteen'),
    _t(17, 'seventeen'),
    _t(18, 'eighteen'),
    _t(19, 'nineteen'),
    _t(20, 'twenty'),
    _t(21, 'twenty-one'),
    _t(23, 'twenty-three'),
    _t(25, 'twenty-five'),
    _t(27, 'twenty-seven'),
    _t(29, 'twenty-nine'),
    _t(30, 'thirty'),
    _t(32, 'thirty-two'),
    _t(34, 'thirty-four'),
    _t(36, 'thirty-six'),
    _t(38, 'thirty-eight'),
    _t(40, 'forty'),
    _t(41, 'forty-one'),
    _t(42, 'forty-two'),
    _t(50, 'fifty'),
    _t(53, 'fifty-three'),
    _t(54, 'fifty-four'),
    _t(60, 'sixty'),
    _t(65, 'sixty-five'),
    _t(66, 'sixty-six'),
    _t(70, 'seventy'),
    _t(77, 'seventy-seven'),
    _t(78, 'seventy-eight'),
    _t(80, 'eighty'),
    _t(89, 'eighty-nine'),
    _t(90, 'ninety'),
    _t(91, 'ninety-one'),
    _t(97, 'ninety-seven'),
    _t(100, 'one hundred'),
    _t(200, 'two hundred'),
    _t(500, 'five hundred'),
    _t(900, 'nine hundred'),
    _t(101, 'one hundred one'),
    _t(304, 'three hundred four'),
    _t(410, 'four hundred ten'),
    _t(617, 'six hundred seventeen'),
    _t(712, 'seven hundred twelve'),
    _t(835, 'eight hundred thirty-five'),
  ];

  testData.forEach(({ input, expected }) => {
    it(`returns "${expected}" when given ${input}`, () => {
      expect(numberToWords(input)).toEqual(expected);
    });
  });
});
