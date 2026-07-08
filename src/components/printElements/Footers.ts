import FooterProps from './FooterProps.js';
import FooterScore from './FooterScore.js';
import FooterScoreAndTime from './FooterScoreAndTime.js';

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
