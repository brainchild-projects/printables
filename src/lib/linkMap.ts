import { lazy } from 'react';
import { SectionLinks } from './LinkAndLoaderInterface';

const HomePage = lazy(() => import('../pages/main/HomePage'));
const CalendarPage = lazy(() => import('../pages/calendar/CalendarPage'));
const AdditionFillTheBlanksPage = lazy(() => import('../pages/additionFillTheBlanks/AdditionFillTheBlanksPage'));
const VerticalAdditionPage = lazy(() => import('../pages/verticalAddition/VerticalAdditionPage'));
const AdditionSubtractionPage = lazy(() => import('../pages/additionSubtraction/AdditionSubtractionPage'));
const SubtractionWithFiguresPage = lazy(() => import('../pages/subtractionWithFigures/SubtractionWithFiguresPage'));
const SubtractionFillInTheBlanksPage = lazy(() => import('../pages/subtractionFillInTheBlanks/SubtractionFillInTheBlanksPage'));
const VerticalSubtractionPage = lazy(() => import('../pages/verticalSubtraction/VerticalSubtractionPage'));
const VerticalMultiplicationPage = lazy(() => import('../pages/verticalMultiplication/VerticalMultiplicationPage'));
const PatternsPage = lazy(() => import('../pages/patterns/PatternsPage'));
const PlaceValuesPage = lazy(() => import('../pages/placeValues/PlaceValuesPage'));
const NumbersToWordsPage = lazy(() => import('../pages/numbersToWords/NumbersToWordsPage'));
const TellingTimePage = lazy(() => import('../pages/tellingTime/TellingTimePage'));
const NumberGridPage = lazy(() => import('../pages/numberGrid/NumberGridPage'));
const SkipCountingPage = lazy(() => import('../pages/skipCounting/SkipCountingPage'));
const CompareNumbersPage = lazy(() => import('../pages/compareNumbers/CompareNumbersPage'));
const OddEvenPage = lazy(() => import('../pages/oddEven/OddEvenPage'));
const ExperimentsPage = lazy(() => import('../pages/experiments/ExperimentsPage'));
const SettingsPage = lazy(() => import('../pages/settings/SettingsPage'));

const isProduction = import.meta.env.PROD;

export const basePath = isProduction
  ? import.meta.env.BASE_URL
  : undefined;

export const mainLinks: SectionLinks = new Map([
  ['/', {
    text: 'Home',
    loader: HomePage,
  }],
  ['/settings', {
    text: 'Settings',
    loader: SettingsPage,
  }],
]);

if (!isProduction) {
  mainLinks.set('/experiments', {
    text: 'Experiments',
    loader: ExperimentsPage,
  });
}

export const mathLinks: SectionLinks = new Map([
  ['/worksheet-compare-numbers', {
    text: 'Compare Numbers',
    loader: CompareNumbersPage,
  }],
  ['/worksheet-odd-even', {
    text: 'Odd Even',
    loader: OddEvenPage,
  }],
  ['/addition-fill-the-blanks', {
    text: 'Addition: Fill in the Blanks',
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
  ['/worksheet-subtraction-fill-in-the-blanks', {
    text: 'Subtraction: Fill in the Blanks',
    loader: SubtractionFillInTheBlanksPage,
  }],
  ['/workheet-vertical-subtraction', {
    text: 'Vertical Subtraction',
    loader: VerticalSubtractionPage,
  }],
  [ '/worksheet-vertical-multiplication', {
    text: 'Vertical Multiplication',
    loader: VerticalMultiplicationPage,
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
  ['/worksheet-telling-time', {
    text: 'Telling Time',
    loader: TellingTimePage,
  }],
  ['/worksheet-number-grid', {
    text: 'Number Grid',
    loader: NumberGridPage,
  }],
  ['/worksheet-skip-counting', {
    text: 'Skip Counting',
    loader: SkipCountingPage,
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
