import HtmlFieldChangeEvent from './HtmlFieldChangeEvent';

export default function parseEventValueAsInt(event: HtmlFieldChangeEvent): number {
  return Number.parseInt(event.target.value, 10);
}
