import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CalendarPage from '../pages/calendar/CalendarPage';
import MainPage from '../pages/main/MainPage';
import BaseStyle from './BaseStyle';
import PrintablesAppBar from './PrintablesAppBar';

const basePath = process.env.PUBLIC_URL;

function App(): JSX.Element {
  return (
    <>
      <BaseStyle />
      <PrintablesAppBar />
      <main>
        <Router basename={basePath}>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/calendar" component={CalendarPage} />
        </Router>
      </main>
    </>
  );
}

export default App;
