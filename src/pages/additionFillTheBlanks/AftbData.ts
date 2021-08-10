export type BlankPositionStrategy = 'sum' | 'addends' | 'random';
export default interface AftbData {
  rangeFrom: number;
  rangeTo: number;
  problems: number;
  blankStrategy: BlankPositionStrategy;
}
