import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createTheme, makeStyles, MuiThemeProvider } from '@material-ui/core';
import MainPage from '../pages/main/MainPage';
import BaseStyle from './BaseStyle';
import PrintablesAppBar from './PrintablesAppBar';
import CalendarPage from '../pages/calendar/CalendarPage';
import AdditionFillTheBlanksPage from '../pages/additionFillTheBlanks/AdditionFillTheBlanksPage';

const { NODE_ENV, PUBLIC_URL } = process.env;

const basePath = NODE_ENV === 'production'
  ? PUBLIC_URL
  : undefined;

const styles = makeStyles((theme) => ({
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

function App(): JSX.Element {
  const classes = styles();
  return (
    <Router basename={basePath}>
      <MuiThemeProvider theme={theme}>
        <BaseStyle />
        <PrintablesAppBar />
        <main className={`${classes.main} print-ignore`}>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/calendar" component={CalendarPage} />
          <Route exact path="/addition-fill-the-blanks" component={AdditionFillTheBlanksPage} />
        </main>
      </MuiThemeProvider>
    </Router>
  );
}

export default App;
