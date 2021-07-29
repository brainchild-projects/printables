import React, {
  ReactNode, FormEvent, ChangeEvent,
} from 'react';
import {
  Button, makeStyles, Select, Typography,
} from '@material-ui/core';
import FieldSet from './FieldSet';
import { usePaperOptions } from '../PaperOptionsProvider';

const calendarFormStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),

    '& > section': {
      marginBottom: theme.spacing(3),
    },
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
  },
}));

interface CustomizeFormProps {
  onBeforePrint: () => boolean;
  name: string;
  children: ReactNode;
}

const CustomizeForm = ({ onBeforePrint, name, children }: CustomizeFormProps): JSX.Element => {
  const classes = calendarFormStyles();
  const { options, setOptions } = usePaperOptions();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (onBeforePrint()) {
      window.print();
    }
  };

  return (
    <div className={classes.wrapper}>
      <form className={classes.form} onSubmit={onSubmit}>
        <section aria-label="Main Customization">
          {children}
        </section>
        <section aria-label="Printing Options">
          <Typography
            variant="h6"
            component="h2"
          >
            Print Options
          </Typography>
          <FieldSet
            label="Orientation"
            id="select-paper-orientation"
          >
            <Select
              native
              name="month"
              id="select-paper-orientation"
              value={options.orientation}
              fullWidth
              onChange={
                (event: ChangeEvent<{ value: unknown }>) => {
                  setOptions({
                    ...options,
                    orientation: event.target.value as string,
                  });
                }
              }
            >
              <option value="landscape">Landscape</option>
              <option value="portrait">Portrait</option>
            </Select>

          </FieldSet>
        </section>
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
