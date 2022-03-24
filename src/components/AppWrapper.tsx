import React, { lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, makeStyles, MuiThemeProvider } from '@material-ui/core';
import BaseStyle from './BaseStyle';
import PrintablesAppBar from './PrintablesAppBar';
import ScrollToTop from './ScrollToTop';
import NumbersToWordsPage from '../pages/numbersToWords/NumbersToWordsPage';

const MainPage = lazy(() => import('../pages/main/MainPage'));
const CalendarPage = lazy(() => import('../pages/calendar/CalendarPage'));
const AdditionFillTheBlanksPage = lazy(() => import('../pages/additionFillTheBlanks/AdditionFillTheBlanksPage'));
const PatternsPage = lazy(() => import('../pages/patterns/PatternsPage'));
const PlaceValuesPage = lazy(() => import('../pages/placeValues/PlaceValuesPage'));
const ExperimentsPage = lazy(() => import('../pages/experiments/ExperimentsPage'));

const { NODE_ENV, PUBLIC_URL } = process.env;
const isProduction = NODE_ENV === 'production';

const basePath = isProduction
  ? PUBLIC_URL
  : undefined;

const styles = makeStyles(() => ({
  main: {
    backgroundSize: 'cover',
    padding: '76px 0 0',
  },
}));

const theme = createTheme({
  palette: {
    background: {
      default: '#efedee',
      paper: '#ffffff',
    },
  },
});

const routesMap = new Map<string, React.ElementType>([
  ['/', MainPage],
  ['/calendar', CalendarPage],
  ['/addition-fill-the-blanks', AdditionFillTheBlanksPage],
  ['/worksheet-patterns', PatternsPage],
  ['/worksheet-place-values', PlaceValuesPage],
  ['/worksheet-numbers-to-words', NumbersToWordsPage],
]);

if (!isProduction) {
  routesMap.set('/experiments', ExperimentsPage);
}

function AppWrapper(): JSX.Element {
  const classes = styles();
  // const routes: Array<JSX.Element> = [];
  const routes: Array<JSX.Element> = Array.from(routesMap.entries())
    .map(([path, Node]) => <Route path={path} key={path} element={<Node />} />);
  return (
    <Router basename={basePath}>
      <ScrollToTop />
      <MuiThemeProvider theme={theme}>
        <BaseStyle />
        <PrintablesAppBar />
        <main className={`${classes.main} print-ignore print-auto-max-width AppWrapper`}>
          <Routes>{routes}</Routes>
        </main>
      </MuiThemeProvider>
    </Router>
  );
}

export default AppWrapper;
