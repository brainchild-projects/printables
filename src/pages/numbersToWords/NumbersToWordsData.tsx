import FontSizeData from '../../components/forms/FontSizeData.js';
import { Magnitude } from '../../lib/math/magnitude.js';

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
