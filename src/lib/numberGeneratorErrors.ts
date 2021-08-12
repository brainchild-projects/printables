export function maxMustNotBeLessThanMin(max: number, min: number): void {
  if (max < min) {
    throw Error(`max (${max}) should not be less than min (${min})`);
  }
}

export default {
  maxMustNotBeLessThanMin,
};
