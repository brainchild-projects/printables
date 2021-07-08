import React from 'react';
import {
  Typography, Grid,
} from '@material-ui/core';
import CustomizeCalendarForm from './CustomizeCalendarForm';

function PreviewCalendar() {
  return <h1>Preview Here</h1>;
}

const CalendarPage = (): JSX.Element => (
  <Grid container spacing={3}>
    <Grid item sm={3}>
      <section aria-label="Customize Calendar">
        <Typography variant="h4" component="h1">Calendar</Typography>
        <CustomizeCalendarForm />
      </section>
    </Grid>
    <Grid item sm={9}>
      <section aria-label="Preview">
        <PreviewCalendar />
      </section>
    </Grid>
  </Grid>
);

export default CalendarPage;
