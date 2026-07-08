import zeroPad from '../../lib/zeroPad.js';

class SimpleTime {
  hour: number;

  minute: number;

  constructor(hour: number, minute: number) {
    this.hour = hour;
    this.minute = minute;
  }

  toString(): string {
    return `${this.hour}:${zeroPad(this.minute)}`;
  }
}

export default SimpleTime;
