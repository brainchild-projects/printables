import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CalendarPage from '../pages/calendar/CalendarPage';
import MainPage from '../pages/main/MainPage';
import BaseStyle from './BaseStyle';

function App(): JSX.Element {
  return (
    <>
      <BaseStyle />
      <Router>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/calendar" component={CalendarPage} />
      </Router>
    </>
  );
}

export default App;
