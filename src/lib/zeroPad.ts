export default function zeroPad(n: number): string {
  return n < 10 ? `0${n}` : n.toString();
}
