import randomElement from './randomElement.js';
import { basicOutlinedShapes } from './symbolCharacters.js';

export type ShapeFunction = (symbolList?: string[]) => string;

export default function getRandomShape(symbolList: string[] = basicOutlinedShapes): string {
  return randomElement<string>(symbolList);
}
