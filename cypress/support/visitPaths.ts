const paths = {
  home: '/',
  settings: '/settings',
  calendar: '/calendar',
  additionFillTheBlanks: '/addition-fill-the-blanks',
  worksheetPatterns: '/worksheet-patterns',
  worksheetPlaceValues: '/worksheet-place-values',
  worksheetNumbersToWords: '/worksheet-numbers-to-words',
  worksheetAdditionSubtraction: '/worksheet-addition-subtraction',
  worksheetVerticalAddition: '/worksheet-vertical-addition',
  worksheetSubtractionWithFigures: '/worksheet-subtraction-with-figures',
  worksheetSubtractionFillInTheBlanks: '/worksheet-subtraction-fill-in-the-blanks',
  worksheetTellingTime: '/worksheet-telling-time',
  worksheetNumberGrid: '/worksheet-number-grid',
  worksheetSkipCounting: '/worksheet-skip-counting',
  worksheetCompareNumbers: 'worksheet-compare-numbers',
} as const satisfies { [k: string]: string };

export type VisitPathMap = typeof paths;
export type VisitPathMapKeys = keyof VisitPathMap;
export type VisitMethodNames = `visit${Capitalize<VisitPathMapKeys>}`;

export type VisitCommands = {
  [K in VisitPathMapKeys as `visit${Capitalize<K>}`]: () => Cypress.Chainable<Cypress.AUTWindow>;
};

export default paths;
