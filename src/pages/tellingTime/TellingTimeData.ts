export type ProblemType = 'hours' | 'hours and half hours' | '5-minute intervals';
export const problemTypeOptions = new Map<ProblemType, string>([
  ['hours', 'Hours'],
  ['hours and half hours', 'Hours and Half Hours'],
  ['5-minute intervals', '5-minute Intervals'],
]);

export default interface TellingTimeData {
  count: number;
  columns: number;
  problemType: ProblemType;
}
