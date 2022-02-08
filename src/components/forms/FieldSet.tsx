import React, { ReactNode } from 'react';
import { FormControl, InputLabel, makeStyles } from '@material-ui/core';

const styles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1, 0, 0),
  },
}));

interface FieldSetProps {
  children: ReactNode;
  label?: string;
  id?: string;
}

function FieldSet({ children, label, id }: FieldSetProps): JSX.Element {
  const classes = styles();
  const labelElement = label
    ? (<InputLabel htmlFor={id}>{ label }</InputLabel>)
    : null;

  return (
    <FormControl
      variant="filled"
      fullWidth
      className={classes.formControl}
    >
      { labelElement }
      { children }
    </FormControl>
  );
}

FieldSet.defaultProps = {
  label: null,
  id: null,
};

export default FieldSet;
