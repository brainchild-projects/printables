export default function numberOrEmpty(value: unknown): number | string {
  return Number.isNaN(value) ? '' : value as number;
}
