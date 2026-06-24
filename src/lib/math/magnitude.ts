const magnitudeToDigits = {
  'tens': 2,
  'hundreds': 3,
  'thousands': 4,
  'millions': 7,
  'billions': 10,
} as const;
export type Magnitude = keyof typeof magnitudeToDigits;
export const magnitudes = Object.keys(magnitudeToDigits) as Array<Magnitude>;

export function magnitudeDigits(magnitude: Magnitude): number {
  return magnitudeToDigits[magnitude];
}

export function maxFromMagnitude(magnitude: Magnitude): number {
  return (magnitudeDigits(magnitude) ** 2) - 1;
}
