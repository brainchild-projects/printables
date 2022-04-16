import Range from '../../lib/Range';

export type ProblemGeneration = 'single range' | 'custom addends';
export const problemGenerationOptions = new Map([
  ['single range', 'Single Range'],
  ['custom addends', 'Custom Addends'],
]);

export default interface VerticalAdditionData {
  count: number;
  problemGeneration: ProblemGeneration;
  range: Range;
  customAddendsA: Range;
  customAddendsB: Range;
  columns: number;
}
