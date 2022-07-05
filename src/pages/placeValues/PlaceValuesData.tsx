import { Magnitude } from '../../lib/math/magnitude';

export type PlaceValueProblemType = 'blanks' | 'choice';

export const problemTypes = new Map<PlaceValueProblemType, string>([
  ['blanks', 'Fill in the Blanks'],
  ['choice', 'Multiple Choice'],
]);

export default interface PlaceValuesData {
  solution: PlaceValueProblemType;
  count: number;
  magnitude: Magnitude;
  columns: number;
}
