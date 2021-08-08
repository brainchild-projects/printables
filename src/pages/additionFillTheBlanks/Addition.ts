class Addition {
  addendA: number;

  addendB: number;

  constructor(addendA: number, addendB: number) {
    this.addendA = addendA;
    this.addendB = addendB;
  }

  sum(): number {
    return this.addendA + this.addendB;
  }
}

export default Addition;
