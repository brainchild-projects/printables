import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../../components/Hero';

const MainPage = (): JSX.Element => (
  <>
    <Hero title="Printables" subtitle="Printable materials for Education" />
    <ul>
      <li><Link to="/calendar">Calendar</Link></li>
    </ul>
  </>
);

export default MainPage;
