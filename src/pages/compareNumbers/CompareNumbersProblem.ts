import { NumberComparison } from './CompareNumbersData';

class CompareNumbersProblem {
  left: number;

  right: number;

  constructor(left: number, right: number) {
    this.left = left;
    this.right = right;
  }

  symbol(): NumberComparison {
    if (this.left === this.right) {
      return '=';
    }
    return this.left > this.right ? '>' : '<';
  }

  toString() {
    const symbol = this.symbol() as string;
    return `${this.left} ${symbol} ${this.right}`;
  }
}

export default CompareNumbersProblem;
