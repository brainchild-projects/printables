type RetryKey = string | number[] | number;
type VoidFunction = () => void;
type RetryFunction = (key: RetryKey, callback: VoidFunction) => void;

/**
 * Returns a function that does not run again for a given key
 * unless { maximumTries } is reached.
 *
 * Useful for generating items that are unique enough
 * while ensuring not to run into infinite loops.
 *
 * @export
 * @param {number} [maximumTries=6] The number of tries before giving up
 * @return {RetryFunction}
 */
export default function tryByKey(maximumTries = 6): RetryFunction {
  const found: Map<string, number> = new Map([]);
  return function wrapper(rawKey, fn) {
    const key = rawKey.toString();
    const set = found.get(key);
    if (set === undefined) {
      fn();
      found.set(key, 1);
    } else {
      const retries = set + 1;
      found.set(key, retries);
      if (retries > maximumTries) {
        found.delete(key);
      }
    }
  };
}
