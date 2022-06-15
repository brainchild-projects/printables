import { lazy } from 'react';
import { SectionLinks } from './LinkAndLoaderInterface';

const HomePage = lazy(() => import('../pages/main/HomePage'));
const CalendarPage = lazy(() => import('../pages/calendar/CalendarPage'));
const AdditionFillTheBlanksPage = lazy(() => import('../pages/additionFillTheBlanks/AdditionFillTheBlanksPage'));
const VerticalAdditionPage = lazy(() => import('../pages/verticalAddition/VerticalAdditionPage'));
const AdditionSubtractionPage = lazy(() => import('../pages/additionSubtraction/AdditionSubtractionPage'));
const SubtractionWithFiguresPage = lazy(() => import('../pages/subtractionWithFigures/SubtractionWithFiguresPage'));
const SubtractionFillInTheBlanksPage = lazy(() => import('../pages/subtractionFillInTheBlanks/SubtractionFillInTheBlanksPage'));
const PatternsPage = lazy(() => import('../pages/patterns/PatternsPage'));
const PlaceValuesPage = lazy(() => import('../pages/placeValues/PlaceValuesPage'));
const NumbersToWordsPage = lazy(() => import('../pages/numbersToWords/NumbersToWordsPage'));
const TellingTimePage = lazy(() => import('../pages/tellingTime/TellingTimePage'));
const NumberGridPage = lazy(() => import('../pages/numberGrid/NumberGridPage'));
const ExperimentsPage = lazy(() => import('../pages/experiments/ExperimentsPage'));
const SettingsPage = lazy(() => import('../pages/settings/SettingsPage'));

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
