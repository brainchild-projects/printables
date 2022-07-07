import { Magnitude } from '../../lib/math/magnitude';

export type NumbersToWordsProblemType = 'blanks' | 'choice';
export const problemTypes = new Map<NumbersToWordsProblemType, string>([
  ['blanks', 'Fill in the Blanks'],
  ['choice', 'Multiple Choice'],
]);
interface NumbersToWordsData {
  problemType: NumbersToWordsProblemType;
  magnitude: Magnitude;
  count: number;
}

export default NumbersToWordsData;
