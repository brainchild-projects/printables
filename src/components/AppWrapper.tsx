import React, { lazy } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createTheme, makeStyles, MuiThemeProvider } from '@material-ui/core';
import BaseStyle from './BaseStyle';
import PrintablesAppBar from './PrintablesAppBar';

const MainPage = lazy(() => import('../pages/main/MainPage'));
const CalendarPage = lazy(() => import('../pages/calendar/CalendarPage'));
const AdditionFillTheBlanksPage = lazy(() => import('../pages/additionFillTheBlanks/AdditionFillTheBlanksPage'));
const PatternsPage = lazy(() => import('../pages/patterns/PatternsPage'));

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
      <MuiThemeProvider theme={theme}>
        <BaseStyle />
        <PrintablesAppBar />
        <main className={`${classes.main} print-ignore print-auto-max-width AppWrapper`}>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/calendar" component={CalendarPage} />
          <Route exact path="/addition-fill-the-blanks" component={AdditionFillTheBlanksPage} />
          <Route exact path="/worksheet-patterns" component={PatternsPage} />
        </main>
      </MuiThemeProvider>
    </Router>
  );
}

export default AppWrapper;
