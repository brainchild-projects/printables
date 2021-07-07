import React from 'react';
import { Link } from 'react-router-dom';
import {
  List, ListItem, ListItemText, Container,
} from '@material-ui/core';
import Hero from '../../components/Hero';

const MainPage = (): JSX.Element => (
  <>
    <Hero title="Printables" subtitle="Printable materials for Education" />
    <Container>
      <List>
        <ListItem>
          <ListItemText secondary="Generate a printable calendar for the month">
            <Link to="/calendar">Calendar</Link>
          </ListItemText>
        </ListItem>
      </List>
    </Container>
  </>
);

export default MainPage;
