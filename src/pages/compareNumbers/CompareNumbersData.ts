import { Magnitude } from '../../lib/math/magnitude';

export type NumberComparison = '>' | '<' | '=';
export const numberComparisons: NumberComparison[] = [
  '>',
  '<',
  '=',
];

export default interface CompareNumbersData {
  count: number;
  magnitude: Magnitude;
  columns: number;
}
