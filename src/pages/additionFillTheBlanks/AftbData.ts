import Range from '../../lib/Range';
import FontSizeData from '../../components/forms/FontSizeData';

export type BlankPositionStrategy = 'sum' | 'addends' | 'random';
export type ProblemGeneration = 'single range' | 'custom addends';

export const problemGenerations: Map<ProblemGeneration, string> = new Map([
  ['single range', 'Single Range'],
  ['custom addends', 'Custom Addends'],
]);

export default interface AftbData extends FontSizeData {
  rangeFrom: number;
  rangeTo: number;
  problems: number;
  blankStrategy: BlankPositionStrategy;
  problemGeneration: ProblemGeneration;
  customAddendsA: Range;
  customAddendsB: Range;
  columns: number;
}
