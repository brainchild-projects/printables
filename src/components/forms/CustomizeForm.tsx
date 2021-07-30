import React, {
  ReactNode, FormEvent, ChangeEvent,
} from 'react';
import {
  Button, Collapse, makeStyles, Select, Typography,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
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
  error?: string | null,
}

const CustomizeForm = ({
  onBeforePrint, name, children, error = null,
}: CustomizeFormProps): JSX.Element => {
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
        <Collapse in={!!error}>
          <Alert severity="error">{ error }</Alert>
        </Collapse>

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
          disabled={error !== null}
        >
          Print
          {' '}
          { name }
        </Button>
      </form>
    </div>
  );
};

CustomizeForm.defaultProps = {
  error: null,
};

export default CustomizeForm;
