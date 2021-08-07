/* eslint-disable react/no-array-index-key */
import { Box, makeStyles } from '@material-ui/core';
import React from 'react';
import PaperPage from '../../components/PaperPage';

import CalendarData from './CalendarData';
import { DateNumber, getWeekDates } from './previewUtils';

const dateFormat = new Intl.DateTimeFormat(
  'en-US',
  {
    year: 'numeric',
    month: 'long',
  },
);

interface PreviewCalendarProps {
  calendarData: CalendarData,
}

const previewStyles = makeStyles((theme) => ({
  title: {
    fontSize: '36px',
    fontWeight: 'normal',
    fontFamily: '"Source Sans Pro", inherit',
  },
  wrap: {
    textAlign: 'center',
    display: 'flex',
    flexFlow: 'column',
  },
  contentWrap: {
    flexGrow: 1,
  },
  calendar: {
    width: '100%',
    border: '1px solid #666',
    borderCollapse: 'collapse',
    tableLayout: 'fixed',
    height: '100%',
  },
  headers: {
    '& > tr': {
      height: '36px',
    },
    '& th': {
      textTransform: 'uppercase',
      fontWeight: 'normal',
      letterSpacing: '0.07em',
      padding: theme.spacing(1, 0),
      border: '1px solid #666',
      borderCollapse: 'collapse',
      width: `${1.0 / 7}%`,
      height: '0px',
      fontSize: '12px',
      fontFamily: '"Source Sans Pro", inherit',
    },
  },
  body: {
    '& td': {
      padding: theme.spacing(1),
      minHeight: '40px',
      textAlign: 'left',
      border: '1px solid #666',
      borderCollapse: 'collapse',
      verticalAlign: 'top',
      width: `${1.0 / 7}%`,
      fontSize: '12px',
      fontFamily: '"Source Sans Pro", inherit',
    },
    '& .not-current-month': {
      color: '#999',
    },
  },
}));

function dateCells(week: DateNumber[], weekIndex: number): JSX.Element[] {
  return (
    week.map(({ value, current }) => (
      <td
        key={`week-${weekIndex}-${value}`}
        className={current ? 'current-month' : 'not-current-month'}
      >
        {value}
      </td>
    ))
  );
}

function PreviewCalendar(props: PreviewCalendarProps): JSX.Element {
  const { calendarData } = props;
  const { year, month } = calendarData;
  const referenceDate = new Date(year, month, 1);
  const weeks = getWeekDates(referenceDate);
  const classes = previewStyles();

  return (
    <PaperPage noFlexWrap>
      <Box className={classes.wrap}>
        <h1 className={classes.title}>{ dateFormat.format(referenceDate) }</h1>
        <div className={classes.contentWrap}>
          <table className={classes.calendar}>
            <thead className={classes.headers}>
              <tr>
                <th>Sunday</th>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
                <th>Saturday</th>
              </tr>
            </thead>
            <tbody aria-label="Dates" className={`${classes.body} calendar-body`}>
              {
                weeks.map((week, index) => (
                  <tr key={`week-${index}`}>
                    { dateCells(week, index) }
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </Box>
    </PaperPage>
  );
}

export default PreviewCalendar;
