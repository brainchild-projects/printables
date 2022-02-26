import React, { lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, makeStyles, MuiThemeProvider } from '@material-ui/core';
import BaseStyle from './BaseStyle';
import PrintablesAppBar from './PrintablesAppBar';
import ScrollToTop from './ScrollToTop';

const MainPage = lazy(() => import('../pages/main/MainPage'));
const CalendarPage = lazy(() => import('../pages/calendar/CalendarPage'));
const AdditionFillTheBlanksPage = lazy(() => import('../pages/additionFillTheBlanks/AdditionFillTheBlanksPage'));
const PatternsPage = lazy(() => import('../pages/patterns/PatternsPage'));
const PlaceValuesPage = lazy(() => import('../pages/placeValues/PlaceValuesPage'));

const { NODE_ENV, PUBLIC_URL } = process.env;

const basePath = NODE_ENV === 'production'
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

function AppWrapper(): JSX.Element {
  const classes = styles();
  return (
    <Router basename={basePath}>
      <ScrollToTop />
      <MuiThemeProvider theme={theme}>
        <BaseStyle />
        <PrintablesAppBar />
        <main className={`${classes.main} print-ignore print-auto-max-width AppWrapper`}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/addition-fill-the-blanks" element={<AdditionFillTheBlanksPage />} />
            <Route path="/worksheet-patterns" element={<PatternsPage />} />
            <Route path="/worksheet-place-values" element={<PlaceValuesPage />} />
          </Routes>
        </main>
      </MuiThemeProvider>
    </Router>
  );
}

export default AppWrapper;
