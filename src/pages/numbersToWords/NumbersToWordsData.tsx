import FontSizeData from '../../components/forms/FontSizeData';
import { Magnitude } from '../../lib/math/magnitude';

export type NumbersToWordsProblemType = 'blanks' | 'choice';
export const problemTypes = new Map<NumbersToWordsProblemType, string>([
  ['blanks', 'Fill in the Blanks'],
  ['choice', 'Multiple Choice'],
]);

export default interface NumbersToWordsData extends FontSizeData {
  problemType: NumbersToWordsProblemType;
  magnitude: Magnitude;
  count: number;
}
