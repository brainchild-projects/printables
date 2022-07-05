export type Magnitude = 'tens' | 'hundreds' | 'thousands';
export const magnitudes: Magnitude[] = ['tens', 'hundreds', 'thousands'];

export function maxFromMagnitude(magnitude: Magnitude): number {
  switch (magnitude) {
    case 'thousands':
      return 9999;

    case 'hundreds':
      return 999;

    default:
      return 99;
  }
}

export function magNFromMagnitude(magnitude: Magnitude): number {
  switch (magnitude) {
    case 'thousands':
      return 4;

    case 'hundreds':
      return 3;

    default:
      return 2;
  }
}
