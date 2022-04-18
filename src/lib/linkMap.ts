import { lazy } from 'react';
import { SectionLinks } from './LinkAndLoaderInterface';

const HomePage = lazy(() => import('../pages/main/HomePage'));
const CalendarPage = lazy(() => import('../pages/calendar/CalendarPage'));
const AdditionFillTheBlanksPage = lazy(() => import('../pages/additionFillTheBlanks/AdditionFillTheBlanksPage'));
const AdditionSubtractionPage = lazy(() => import('../pages/additionSubtraction/AdditionSubtractionPage'));
const SubtractionWithFiguresPage = lazy(() => import('../pages/subtractionWithFigures/SubtractionWithFiguresPage'));
const VerticalAdditionPage = lazy(() => import('../pages/verticalAddition/VerticalAdditionPage'));
const PatternsPage = lazy(() => import('../pages/patterns/PatternsPage'));
const PlaceValuesPage = lazy(() => import('../pages/placeValues/PlaceValuesPage'));
const NumbersToWordsPage = lazy(() => import('../pages/numbersToWords/NumbersToWordsPage'));
const ExperimentsPage = lazy(() => import('../pages/experiments/ExperimentsPage'));

const { NODE_ENV, PUBLIC_URL } = process.env;
const isProduction = NODE_ENV === 'production';

export const basePath = isProduction
  ? PUBLIC_URL
  : undefined;

export const mainLinks: SectionLinks = new Map([
  ['/', {
    text: 'Home',
    loader: HomePage,
  }],
]);

if (!isProduction) {
  mainLinks.set('/experiments', {
    text: 'Experiments',
    loader: ExperimentsPage,
  });
}

export const mathLinks: SectionLinks = new Map([
  ['/addition-fill-the-blanks', {
    text: 'Addition: Fill The Blanks',
    loader: AdditionFillTheBlanksPage,
  }],
  ['/worksheet-vertical-addition', {
    text: 'Vertical Addition',
    loader: VerticalAdditionPage,
  }],
  ['/worksheet-addition-subtraction', {
    text: 'Addition-Subtraction Relationship',
    loader: AdditionSubtractionPage,
  }],
  ['/worksheet-subtraction-with-figures', {
    text: 'Subtraction with Figures',
    loader: SubtractionWithFiguresPage,
  }],
  ['/worksheet-patterns', {
    text: 'Patterns',
    loader: PatternsPage,
  }],
  ['/worksheet-place-values', {
    text: 'Place Values',
    loader: PlaceValuesPage,
  }],
  ['/worksheet-numbers-to-words', {
    text: 'Numbers to Words',
    loader: NumbersToWordsPage,
  }],
]);

export const miscLinks: SectionLinks = new Map([
  ['/calendar', {
    text: 'Calendar',
    loader: CalendarPage,
  }],
]);
export interface LinkMap {
  mathLinks: SectionLinks;
  mainLinks: SectionLinks;
  miscLinks: SectionLinks;
}

export const allLinks = new Map([
  ...mainLinks,
  ...mathLinks,
  ...miscLinks,
]);
