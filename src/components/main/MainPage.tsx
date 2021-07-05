import React from 'react';
import { Link } from 'react-router-dom';

const MainPage = (): JSX.Element => (
  <>
    <h1>Printables</h1>
    <p>Printable materials for Education</p>
    <ul>
      <li><Link to="/calendar">Calendar</Link></li>
    </ul>
  </>
);

export default MainPage;
