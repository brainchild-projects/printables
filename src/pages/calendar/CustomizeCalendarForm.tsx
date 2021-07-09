import React, { FormEvent, ChangeEvent, useState } from 'react';
import {
  Button, Select, FormControl, InputLabel, makeStyles,
} from '@material-ui/core';
import CalendarData from './CalendarData';

const calendarFormStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1, 0, 0),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export interface CustomizeCalendarFormProps {
  now: Date,
  onPrint: (data: CalendarData) => void,
  onChange: (data: CalendarData) => void,
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function yearOptions(year: number): JSX.Element[] {
  const start = year - 20;
  const end = year + 20;
  const options = [];
  for (let index = start; index <= end; index += 1) {
    options.push(<option key={index}>{index}</option>);
  }
  return options;
}

function CustomizeCalendarForm(props: CustomizeCalendarFormProps): JSX.Element {
  const { now, onPrint, onChange } = props;
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const [data, setData] = useState({
    year: currentYear,
    month: currentMonth,
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onPrint({
      year: currentYear,
      month: currentMonth,
    });
  };

  const changeHandler = (field: string) => (event: ChangeEvent<{ value: unknown, }>) => {
    const updated = {
      ...data,
      [field]: Number.parseInt(event.target.value as string, 10),
    };
    setData(updated);
    onChange(updated);
  };

  const classes = calendarFormStyles();

  return (
    <div className={classes.wrapper}>
      <form className={classes.form} onSubmit={onSubmit}>
        <FormControl
          variant="filled"
          fullWidth
          className={classes.formControl}
        >
          <InputLabel htmlFor="select-year">Year</InputLabel>
          <Select
            native
            name="year"
            id="select-year"
            value={data.year}
            fullWidth
            onChange={changeHandler('year')}
          >
            { yearOptions(currentYear) }
          </Select>
        </FormControl>
        <FormControl
          variant="filled"
          fullWidth
          className={classes.formControl}
        >
          <InputLabel htmlFor="select-month">Month</InputLabel>
          <Select
            native
            name="month"
            id="select-month"
            value={data.month}
            fullWidth
            onChange={changeHandler('month')}
          >
            {
              months.map((month, index) => (
                <option value={index} key={month}>{month}</option>
              ))
            }
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Print Calendar
        </Button>
      </form>
    </div>
  );
}

export default CustomizeCalendarForm;
