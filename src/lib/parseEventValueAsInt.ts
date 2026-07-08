import HtmlFieldChangeEvent from './HtmlFieldChangeEvent.js';

export default function parseEventValueAsInt(event: HtmlFieldChangeEvent): number {
  return Number.parseInt(event.target.value, 10);
}
