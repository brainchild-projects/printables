class Addition {
  addendA: number;

  addendB: number;

  sumValue: number;

  static create(addendA: number, addendB: number): Addition {
    return new Addition(addendA, addendB);
  }

  constructor(addendA: number, addendB: number) {
    this.addendA = addendA;
    this.addendB = addendB;
    this.sumValue = this.addendA + this.addendB;
  }

  sum(): number {
    return this.sumValue;
  }
}

export default Addition;
