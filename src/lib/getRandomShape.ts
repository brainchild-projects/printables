import randomElement from './randomElement';
import { basicOutlinedShapes } from './symbolCharacters';

export type ShapeFunction = (symbolList?: string[]) => string;

export default function getRandomShape(symbolList: string[] = basicOutlinedShapes): string {
  return randomElement<string>(symbolList);
}
