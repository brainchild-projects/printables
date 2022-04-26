export default function tryByKey(maximumTries = 6) {
  const found: Map<string, number> = new Map([]);
  return function wrapper(key: string, fn: () => void) {
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
