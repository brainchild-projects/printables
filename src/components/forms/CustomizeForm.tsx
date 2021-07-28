import React, { ReactNode, FormEvent } from 'react';
import {
  Button, makeStyles,
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
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface CustomizeFormProps {
  onBeforePrint: () => boolean;
  name: string;
  children: ReactNode;
}

const CustomizeForm = ({ onBeforePrint, name, children }: CustomizeFormProps): JSX.Element => {
  const classes = calendarFormStyles();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (onBeforePrint()) {
      window.print();
    }
  };

  return (
    <div className={classes.wrapper}>
      <form className={classes.form} onSubmit={onSubmit}>
        { children }
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          className={classes.submit}
        >
          Print
          {' '}
          { name }
        </Button>
      </form>
    </div>
  );
};

export default CustomizeForm;
