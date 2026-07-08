import { ProblemGeneration } from '../../lib/math/generateMultiplicationProblems.js';
import Range from '../../lib/Range.js';

export const problemGenerationOptions = new Map<ProblemGeneration, string>([
  ['factors', 'Factors'],
  ['product', 'Product'],
]);

export default interface VerticalMultiplicationData {
  count: number;
  problemGeneration: ProblemGeneration;
  multiplier: Range;
  multiplicand: Range;
  product: Range;
  columns: number;
}
