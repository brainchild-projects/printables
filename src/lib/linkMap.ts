/// <reference types="vite/client" />
// TODO: Somehow we need to add the above to make sure that `import.meta.env`
// properly references Vites' version of `ImportMeta` even when we've already
// added this in tsconfig.json.

import { lazy } from 'react';
import { SectionLinks } from './LinkAndLoaderInterface.js';

const HomePage = lazy(() => import('../pages/main/HomePage.js'));
const CalendarPage = lazy(() => import('../pages/calendar/CalendarPage.js'));
const AdditionFillTheBlanksPage = lazy(() => import('../pages/additionFillTheBlanks/AdditionFillTheBlanksPage.js'));
const VerticalAdditionPage = lazy(() => import('../pages/verticalAddition/VerticalAdditionPage.js'));
const AdditionSubtractionPage = lazy(() => import('../pages/additionSubtraction/AdditionSubtractionPage.js'));
const SubtractionWithFiguresPage = lazy(() => import('../pages/subtractionWithFigures/SubtractionWithFiguresPage.js'));
const SubtractionFillInTheBlanksPage = lazy(() => import('../pages/subtractionFillInTheBlanks/SubtractionFillInTheBlanksPage.js'));
const VerticalSubtractionPage = lazy(() => import('../pages/verticalSubtraction/VerticalSubtractionPage.js'));
const VerticalMultiplicationPage = lazy(() => import('../pages/verticalMultiplication/VerticalMultiplicationPage.js'));
const PatternsPage = lazy(() => import('../pages/patterns/PatternsPage.js'));
const PlaceValuesPage = lazy(() => import('../pages/placeValues/PlaceValuesPage.js'));
const NumbersToWordsPage = lazy(() => import('../pages/numbersToWords/NumbersToWordsPage.js'));
const TellingTimePage = lazy(() => import('../pages/tellingTime/TellingTimePage.js'));
const NumberGridPage = lazy(() => import('../pages/numberGrid/NumberGridPage.js'));
const SkipCountingPage = lazy(() => import('../pages/skipCounting/SkipCountingPage.js'));
const CompareNumbersPage = lazy(() => import('../pages/compareNumbers/CompareNumbersPage.js'));
const OddEvenPage = lazy(() => import('../pages/oddEven/OddEvenPage.js'));
const ExperimentsPage = lazy(() => import('../pages/experiments/ExperimentsPage.js'));
const SettingsPage = lazy(() => import('../pages/settings/SettingsPage.js'));

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
  ['/worksheet-vertical-multiplication', {
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
