import RecordGenerator from './RecordGenerator';

export default function objectFromArray<K, T>(array: K[], generator: RecordGenerator<K, T>): Record<string, T> {
  const obj = {} as Record<string, T>;
  for (let i = 0; i < array.length; i += 1) {
    const [key, value] = generator(array[i]);
    obj[key] = value;
  }
  return obj;
}
