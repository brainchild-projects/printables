export type PlaceValueProblemType = 'blanks' | 'choice';
export type PlaceValuesMagnitude = 'tens' | 'hundreds' | 'thousands';

export const problemTypes = new Map<PlaceValueProblemType, string>([
  ['blanks', 'Fill in the Blanks'],
  ['choice', 'Multiple Choice'],
]);

export const magnitudes = new Map<PlaceValuesMagnitude, string>([
  ['tens', 'Tens'],
  ['hundreds', 'Hundreds'],
  ['thousands', 'Thousands'],
]);

export default interface PlaceValuesData {
  solution: PlaceValueProblemType;
  count: number;
  magnitude: PlaceValuesMagnitude;
  columns: number;
}
