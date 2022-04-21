import PaperSize from './PaperSize';

export const US_LETTER = new PaperSize('US Letter', { width: 216, height: 279 });
export const US_LEGAL = new PaperSize('US Legal', { width: 216, height: 356 });
export const A4 = new PaperSize('A4', { width: 210, height: 297 });

export const paperSizeArray = [
  US_LETTER,
  US_LEGAL,
  A4,
];

const paperSizes = paperSizeArray
  .reduce((map, size) => {
    map.set(size.name, size);
    return map;
  }, new Map<string, PaperSize>());

export function getPaperSizeFromName(name: string, sizes: PaperSize[]): PaperSize {
  const paperSize = sizes.find((size) => size.name === name);
  if (paperSize !== undefined) {
    return paperSize;
  }
  throw new Error(`Unknown paper size ${name}`);
}

export default paperSizes;
