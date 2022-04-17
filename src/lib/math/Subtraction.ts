interface CreateProps {
  minuend?: number;
  subtrahend?: number;
  difference?: number;
}

class Subtraction {
  minuend: number;

  subtrahend: number;

  difference: number;

  static create({ minuend, subtrahend, difference }: CreateProps): Subtraction {
    if (minuend !== undefined && subtrahend !== undefined) {
      return new Subtraction(minuend, subtrahend);
    }
    if (minuend !== undefined && difference !== undefined) {
      return new Subtraction(minuend, minuend - difference);
    }
    if (subtrahend !== undefined && difference !== undefined) {
      return new Subtraction(subtrahend + difference, subtrahend);
    }
    throw Error('Bad arguments');
  }

  constructor(minuend: number, subtrahend: number) {
    this.minuend = minuend;
    this.subtrahend = subtrahend;
    this.difference = minuend - subtrahend;
  }
}

export default Subtraction;
