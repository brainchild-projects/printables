import RecordGenerator from './RecordGenerator';

type ObjectInput<K> = [string, K];

export default function objectFromObject<T, K>(obj: Record<string, K>, generator: RecordGenerator<ObjectInput<K>, T>): Record<string, T> {
  const newObj = {} as Record<string, T>;
  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      const [newKey, value] = generator([key, obj[key]]);
      newObj[newKey] = value;
    }
  }
  return newObj;
}
