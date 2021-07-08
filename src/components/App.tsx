import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import CalendarPage from '../pages/calendar/CalendarPage';
import MainPage from '../pages/main/MainPage';
import BaseStyle from './BaseStyle';
import PrintablesAppBar from './PrintablesAppBar';

const { NODE_ENV, PUBLIC_URL } = process.env;

const basePath = NODE_ENV === 'production'
  ? PUBLIC_URL
  : undefined;

const styles = makeStyles((theme) => ({
  main: {
    margin: theme.spacing(1),
  },
}));

function App(): JSX.Element {
  const classes = styles();
  return (
    <>
      <BaseStyle />
      <PrintablesAppBar />
      <main className={classes.main}>
        <Router basename={basePath}>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/calendar" component={CalendarPage} />
        </Router>
      </main>
    </>
  );
}

export default App;
