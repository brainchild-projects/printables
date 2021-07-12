import React, {
  useState,
} from 'react';
import {
  Typography, Grid, makeStyles,
} from '@material-ui/core';
import CustomizeCalendarForm from './CustomizeCalendarForm';
import CalendarData from './CalendarData';
import PreviewCalendar from './PreviewCalendar';
import PaperPreview from './PaperPreview';

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
  main: {
    overflow: 'auto',

    '@media print': {
      width: '100% !important',
      maxWidth: 'none',
      flexBasis: 'auto',
      overflow: 'visible',
    },
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
    window.print();
  };
  const onChange = (data: CalendarData): void => {
    setCalendarData({ ...data });
  };

  const classes = pageStyles();

  return (
    <Grid container spacing={3} className={`${classes.container} print-ignore`}>
      <Grid item xs={3} sm={2} className={`${classes.column} no-print`}>
        <section aria-label="Customize Calendar" className={classes.sideColumn}>
          <Typography variant="h5" component="h1">Calendar</Typography>
          <CustomizeCalendarForm
            onPrint={onPrint}
            onChange={onChange}
            now={now}
          />
        </section>
      </Grid>
      <Grid item xs={9} sm={10} className={`${classes.main} print-ignore`}>
        <section aria-label="Preview">
          <PaperPreview>
            <PreviewCalendar calendarData={calendarData} />
          </PaperPreview>
        </section>
      </Grid>
    </Grid>
  );
};

export default CalendarPage;
