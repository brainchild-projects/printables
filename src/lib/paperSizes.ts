interface Dimension {
  width: number;
  height: number;
}

export type Orientation = 'portrait' | 'landscape';

interface DimensionString {
  width: string;
  height: string;
}

function unknownOrientationError(orientation: string): Error {
  return Error(`Unknown orientation "${orientation}}". Expected "portrait" or "landscape".`);
}

export interface PaperSizeJSON {
  name: string;
  width: number;
  height: number;
}

export class PaperSize {
  name: string;

  /** Width in millimeters */
  width: number;

  /** Height in millimeters */
  height: number;

  constructor(name: string, { width, height }: Dimension) {
    this.name = name;
    this.width = width;
    this.height = height;
  }

  portrait(): DimensionString {
    return {
      width: `${this.width}mm`,
      height: `${this.height}mm`,
    };
  }

  landscape(): DimensionString {
    return {
      width: `${this.height}mm`,
      height: `${this.width}mm`,
    };
  }

  dimensionsStr(orientation: Orientation): DimensionString {
    switch (orientation) {
      case 'portrait':
        return this.portrait();

      case 'landscape':
        return this.landscape();

      default:
        throw unknownOrientationError(orientation);
    }
  }

  orientationWidth(orientation: Orientation): string {
    switch (orientation) {
      case 'portrait':
        return `${this.width}mm`;

      case 'landscape':
        return `${this.height}mm`;

      default:
        throw unknownOrientationError(orientation);
    }
  }

  aspectRatioStr(orientation: Orientation): string {
    switch (orientation) {
      case 'portrait':
        return `${this.width} / ${this.height}`;

      case 'landscape':
        return `${this.height} / ${this.width}`;

      default:
        throw unknownOrientationError(orientation);
    }
  }

  toJSON(): PaperSizeJSON {
    const {
      name, width, height,
    } = this;
    return {
      name, width, height,
    };
  }
}

export const US_LETTER = new PaperSize('US Letter', { width: 216, height: 279 });
export const US_LEGAL = new PaperSize('US Legal', { width: 216, height: 356 });
export const A4 = new PaperSize('A4', { width: 210, height: 297 });

const paperSizes = [
  US_LETTER,
  US_LEGAL,
  A4,
].reduce((map, size) => {
  map.set(size.name, size);
  return map;
}, new Map<string, PaperSize>());

export function getPaperSizeFromName(name: string): PaperSize {
  const paperSize = paperSizes.get(name);
  if (paperSize !== undefined) {
    return paperSize;
  }
  throw new Error(`Unknown paper size ${name}`);
}

export default paperSizes;
