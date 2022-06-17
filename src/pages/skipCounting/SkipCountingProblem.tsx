interface SkipCountingProblemProps {
  skipBy: number;
  start: number;
  length: number;
  blankAt: number;
}

type NumberOrUnderscore = number | '_';

export default class SkipCountingProblem {
  skipBy: number;

  start: number;

  length: number;

  blankAt: number;

  constructor({
    skipBy, length, start, blankAt,
  }: SkipCountingProblemProps) {
    this.skipBy = skipBy;
    this.length = length;
    this.start = start;
    this.blankAt = blankAt;
  }

  sequence(showAnswer = false): NumberOrUnderscore[] {
    const seq: NumberOrUnderscore[] = [];
    for (let i = 0; i < this.length; i++) {
      seq.push(
        showAnswer || this.blankAt !== i
          ? this.start + (this.skipBy * i)
          : '_',
      );
    }
    return seq;
  }
}
