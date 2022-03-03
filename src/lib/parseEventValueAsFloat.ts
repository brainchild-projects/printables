import HtmlFieldChangeEvent from './HtmlFieldChangeEvent';

export default function parseEventValueAsFloat(event: HtmlFieldChangeEvent): number {
  return Number.parseFloat(event.target.value);
}
