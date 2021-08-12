class Addition {
  addendA: number;

  addendB: number;

  static create(addendA: number, addendB: number): Addition {
    return new Addition(addendA, addendB);
  }

  constructor(addendA: number, addendB: number) {
    this.addendA = addendA;
    this.addendB = addendB;
  }

  sum(): number {
    return this.addendA + this.addendB;
  }
}

export default Addition;
