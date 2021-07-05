import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CalendarPage from './calendar/CalendarPage';
import MainPage from './main/MainPage';

function App(): JSX.Element {
  return (
    <Router>
      <Route exact path="/" component={MainPage} />
      <Route exact path="/calendar" component={CalendarPage} />
    </Router>
  );
}

export default App;
