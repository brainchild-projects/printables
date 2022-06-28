export type BlankPosition = 'end' | 'start' | 'random';
export const blankPositions = new Map<BlankPosition, string>([
  ['end', 'End'],
  ['start', 'Start'],
  ['random', 'Random'],
]);

export default interface PatternsData {
  count: number;
  blankPosition: BlankPosition;
}
