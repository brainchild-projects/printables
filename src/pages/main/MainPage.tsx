import React from 'react';
import { Link } from 'react-router-dom';
import {
  List, ListItem, ListItemText, Container,
  Typography,
} from '@material-ui/core';
import Hero from '../../components/Hero';

const MainPage = (): JSX.Element => (
  <>
    <Hero title="Printables" subtitle="Printable materials for Education" />
    <Container>
      <Typography variant="h4" component="h2">Common</Typography>
      <List>
        <ListItem>
          <ListItemText secondary="Generate a printable calendar for the month">
            <Link to="/calendar">Calendar</Link>
          </ListItemText>
        </ListItem>
      </List>
      <Typography variant="h4" component="h2">Worksheets</Typography>
      <List aria-label="Worksheets">
        <ListItem>
          <ListItemText>
            <Link to="/addition-fill-the-blanks">Addition: Fill the Blanks</Link>
          </ListItemText>
        </ListItem>
      </List>
    </Container>
  </>
);

export default MainPage;
