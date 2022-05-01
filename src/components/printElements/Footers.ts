import FooterProps from './FooterProps';
import FooterScore from './FooterScore';
import FooterScoreAndTime from './FooterScoreAndTime';

export type FooterName = 'Score Only' | 'Score and Time';
type FooterRenderer = (props: FooterProps) => JSX.Element;

export const footerNames: FooterName[] = [
  'Score Only', 'Score and Time',
];

const footers = new Map<string, FooterRenderer>([
  ['Score Only', FooterScore],
  ['Score and Time', FooterScoreAndTime],
]);

export default footers;
