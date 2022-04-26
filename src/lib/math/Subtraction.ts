/* eslint-disable @typescript-eslint/no-non-null-assertion */
interface CreateProps {
  minuend?: number;
  subtrahend?: number;
  difference?: number;
}

function minuendAndSubtrahend({ minuend, subtrahend }: CreateProps): boolean {
  return minuend !== undefined && subtrahend !== undefined;
}

function minuendAndDifference({ minuend, difference }: CreateProps): boolean {
  return minuend !== undefined && difference !== undefined;
}

function subtrahendAndDifference({ subtrahend, difference }: CreateProps): boolean {
  return subtrahend !== undefined && difference !== undefined;
}

class Subtraction {
  minuend: number;

  subtrahend: number;

  difference: number;

  static create(props: CreateProps): Subtraction {
    const { minuend, subtrahend, difference } = props;
    if (minuendAndSubtrahend(props)) {
      return new Subtraction(minuend!, subtrahend!);
    }
    if (minuendAndDifference(props)) {
      return new Subtraction(minuend!, minuend! - difference!);
    }
    if (subtrahendAndDifference(props)) {
      return new Subtraction(subtrahend! + difference!, subtrahend!);
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
