export type NumbersToWordsMagnitude = 'tens' | 'hundreds' | 'thousands';
export const magnitudes: NumbersToWordsMagnitude[] = ['tens', 'hundreds', 'thousands'];

interface NumbersToWordsData {
  magnitude: NumbersToWordsMagnitude;
  count: number;
}

export default NumbersToWordsData;
