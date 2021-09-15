import randomElement from './randomElement';
import { outlinedShapes } from './symbolCharacters';

export type ShapeFunction = (symbolList?: string[]) => string;

export default function getRandomShape(symbolList: string[] = outlinedShapes): string {
  return randomElement<string>(symbolList);
}
