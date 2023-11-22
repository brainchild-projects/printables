import Range from '../../lib/Range';
import FontSizeData from '../../components/forms/FontSizeData';

export type BlankPositionStrategy = 'sum' | 'addends' | 'addend a' | 'addend b' | 'random';
export type ProblemGeneration = 'single range' | 'custom addends' | 'custom sum';

export const problemGenerations: Map<ProblemGeneration, string> = new Map([
  ['single range', 'Single Range'],
  ['custom addends', 'Custom Addends'],
  ['custom sum', 'Custom Sum'],
]);

export default interface AftbData extends FontSizeData {
  rangeFrom: number;
  rangeTo: number;
  problems: number;
  blankStrategy: BlankPositionStrategy;
  problemGeneration: ProblemGeneration;
  customAddendsA: Range;
  customAddendsB: Range;
  sumRangeFrom: number;
  sumRangeTo: number;
  columns: number;
}
