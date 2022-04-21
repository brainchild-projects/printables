import React, { ReactNode } from 'react';
import { FormControl, InputLabel, makeStyles } from '@material-ui/core';

const styles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(1),
  },
  spaced: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

interface FieldSetProps {
  children: ReactNode;
  label?: string;
  id?: string;
  spaced?: boolean;
}

function FieldSet({
  children, label, id, spaced = false,
}: FieldSetProps): JSX.Element {
  const classes = styles();
  const labelElement = label
    ? (<InputLabel htmlFor={id}>{label}</InputLabel>)
    : null;

  return (
    <FormControl
      variant="filled"
      fullWidth
      className={spaced ? classes.spaced : classes.formControl}
    >
      {labelElement}
      {children}
    </FormControl>
  );
}

FieldSet.defaultProps = {
  label: null,
  id: null,
  spaced: false,
};

export default FieldSet;
