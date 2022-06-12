import Range from '../../lib/Range';

export type ProblemGeneration = 'single range' | 'custom addends' | 'no regrouping';
export const problemGenerationOptions = new Map<ProblemGeneration, string>([
  ['single range', 'Single Range'],
  ['custom addends', 'Custom Addends'],
  ['no regrouping', 'No Regrouping'],
]);

export default interface VerticalAdditionData {
  count: number;
  problemGeneration: ProblemGeneration;
  range: Range;
  customAddendsA: Range;
  customAddendsB: Range;
  noRegroupingRange: Range;
  columns: number;
}
