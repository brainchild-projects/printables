import React, { ReactNode } from 'react';
import { FormControl, InputLabel } from '@material-ui/core';
import styleIt from '../styleIt';

const styles = styleIt(() => ({
  formControl: {
    marginTop: 8,
  },
  spaced: {
    marginTop: 16,
    marginBottom: 16,
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
