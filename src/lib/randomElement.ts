import { randomGenerator } from './RandomNumberGenerator';

export default function randomElement<T>(elements: T[]): T {
  return elements[randomGenerator.integer(elements.length - 1)];
}
