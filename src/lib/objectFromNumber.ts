import RecordGenerator from './RecordGenerator';

export default function objectFromNumber<T>(number: number, generator: RecordGenerator<number, T>): Record<string, T> {
  const obj = {} as Record<string, T>;
  for (let i = 0; i < number; i += 1) {
    const [key, value] = generator(i);
    obj[key] = value;
  }
  return obj;
}
