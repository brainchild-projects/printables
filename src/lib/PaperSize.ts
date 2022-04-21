export interface Dimension {
  width: number;
  height: number;
}

export type Orientation = 'portrait' | 'landscape';

interface DimensionString {
  width: string;
  height: string;
}

export interface PaperSizeJSON {
  name: string;
  width: number;
  height: number;
}

function unknownOrientationError(orientation: string): Error {
  return Error(`Unknown orientation "${orientation}}". Expected "portrait" or "landscape".`);
}

export default class PaperSize {
  name: string;

  /** Width in millimeters */
  width: number;

  /** Height in millimeters */
  height: number;

  static fromJSON(obj: PaperSizeJSON): PaperSize {
    const { name, width, height } = obj;
    return new PaperSize(name, { width, height });
  }

  static fromJSONArray(collection: PaperSizeJSON[]): PaperSize[] {
    return collection.map((json) => PaperSize.fromJSON(json));
  }

  static toJSON(size: PaperSize): PaperSizeJSON {
    return size.toJSON();
  }

  static toJSONArray(collection: PaperSize[]): PaperSizeJSON[] {
    return collection.map((size) => PaperSize.toJSON(size));
  }

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
