class PlaceValuesProblem {
  number: number;

  constructor(number: number) {
    this.number = number;
  }

  ones(): number {
    return this.number % 10;
  }

  tens(): number {
    return Math.floor((this.number / 10) % 10);
  }

  hundreds(): number {
    return Math.floor((this.number / 100) % 10);
  }
}

export default PlaceValuesProblem;
