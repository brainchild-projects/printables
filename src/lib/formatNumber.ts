// TODO: Use locale on computer's machine
const numberFormatter = new Intl.NumberFormat('en-US');

export default function formatNumber(num: number): string {
  return numberFormatter.format(num);
}
