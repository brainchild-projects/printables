import Range from '../../lib/Range';
import FontSizeData from '../../components/forms/FontSizeData';

export type ProblemGeneration = 'single range' | 'custom addends';

export const problemGenerations: Map<ProblemGeneration, string> = new Map([
  ['single range', 'Single Range'],
  ['custom addends', 'Custom Addends'],
]);

export default interface AdditionSubtractionData extends FontSizeData {
  rangeFrom: number;
  rangeTo: number;
  count: number;
  problemGeneration: ProblemGeneration;
  customAddendsA: Range;
  customAddendsB: Range;
  columns: number;
  blanksOnAddition: boolean;
  subtractionFirst: boolean;
}
