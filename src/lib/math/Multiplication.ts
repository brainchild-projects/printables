class Multiplication {
  multiplier: number;

  multiplicand: number;

  productValue: number;

  static create(multiplier: number, multiplicand: number): Multiplication {
    return new Multiplication(multiplier, multiplicand);
  }

  constructor(multiplier: number, multiplicand: number) {
    this.multiplier = multiplier;
    this.multiplicand = multiplicand;
    this.productValue = this.multiplier * this.multiplicand;
  }

  get product(): number {
    return this.productValue;
  }
}

export default Multiplication;
