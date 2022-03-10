export type PlaceValueProblemType = 'blanks' | 'choice';
export type PlaceValuesMagnitude = 'tens' | 'hundreds';

export default interface PlaceValuesData {
  solution: PlaceValueProblemType;
  count: number;
  magnitude: PlaceValuesMagnitude | string;
}
