import React, { useState } from 'react';
import {
  Typography, Grid, makeStyles,
} from '@material-ui/core';
import CustomizeCalendarForm from './CustomizeCalendarForm';
import CalendarData from './CalendarData';
import PreviewCalendar from './PreviewCalendar';

const pageStyles = makeStyles((theme) => ({
  container: {
    marginTop: '-64px',
    alignItems: 'stretch',

    '& > .MuiGrid-item': {
      paddingTop: 0,
      paddingBottom: 0,
    },
  },
  column: {
  },
  sideColumn: {
    paddingTop: theme.spacing(2),
  },
}));

const CalendarPage = (): JSX.Element => {
  const now = new Date();
  const [calendarData, setCalendarData] = useState(({
    year: now.getFullYear(),
    month: now.getMonth(),
  }) as CalendarData);
  const onPrint = (data: CalendarData): void => {
    setCalendarData({ ...data });
  };
  const onChange = (data: CalendarData): void => {
    setCalendarData({ ...data });
  };

  const classes = pageStyles();

  return (
    <Grid container spacing={3} className={classes.container}>
      <Grid item sm={3} className={classes.column}>
        <section aria-label="Customize Calendar" className={classes.sideColumn}>
          <Typography variant="h5" component="h1">Calendar</Typography>
          <CustomizeCalendarForm
            onPrint={onPrint}
            onChange={onChange}
            now={now}
          />
        </section>
      </Grid>
      <Grid item sm={9} className={classes.column}>
        <section aria-label="Preview">
          <PreviewCalendar calendarData={calendarData} />
        </section>
      </Grid>
    </Grid>
  );
};

export default CalendarPage;
