import HtmlFieldChangeEvent from './HtmlFieldChangeEvent.js';

export default function parseEventValueAsFloat(event: HtmlFieldChangeEvent): number {
  return Number.parseFloat(event.target.value);
}
