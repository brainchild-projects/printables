import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@material-ui/core';
import Hero from '../../components/Hero';

const MainPage = (): JSX.Element => (
  <>
    <Hero title="Printables" subtitle="Printable materials for Education" />
    <List>
      <ListItem>
        <ListItemText>
          <Link to="/calendar">Calendar</Link>
        </ListItemText>
      </ListItem>
    </List>
  </>
);

export default MainPage;
