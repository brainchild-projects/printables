export type PlaceValuesMagnitude = 'tens' | 'hundreds';

export default interface PlaceValuesData {
  count: number;
  magnitude: PlaceValuesMagnitude | string;
}
