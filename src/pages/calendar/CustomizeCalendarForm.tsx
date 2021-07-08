import React from 'react';
import {
  Button, Select, FormControl, InputLabel, MenuItem, makeStyles,
} from '@material-ui/core';

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

function CustomizeCalendarForm(): JSX.Element {
  const classes = calendarFormStyles();
  return (
    <div className={classes.wrapper}>
      <form className={classes.form}>
        <FormControl
          variant="filled"
          fullWidth
          className={classes.formControl}
        >
          <InputLabel id="select-year">Year</InputLabel>
          <Select
            name="year"
            id="select-year"
            fullWidth
          >
            <MenuItem>2021</MenuItem>
            <MenuItem>2022</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          variant="filled"
          fullWidth
          className={classes.formControl}
        >
          <InputLabel id="select-month">Month</InputLabel>
          <Select
            name="month"
            id="select-month"
            fullWidth
          >
            <MenuItem>January</MenuItem>
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
