import Collapse from '@material-ui/core/Collapse';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import React, { FormEvent, ReactNode } from 'react';

const styles = makeStyles((theme) => ({
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
}));

type ErrorItem = string | undefined | null;

interface FormContainerProps {
  children: ReactNode;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  error?: ErrorItem;
}

function FormContainer({ children, onSubmit, error }: FormContainerProps): JSX.Element {
  const classes = styles();

  return (
    <div className={classes.wrapper}>
      <form className={classes.form} onSubmit={onSubmit}>
        <Collapse in={!!error}>
          <Alert severity="error">{error}</Alert>
        </Collapse>
        {children}
      </form>
    </div>
  );
}

FormContainer.defaultProps = {
  error: undefined,
};

export default FormContainer;
