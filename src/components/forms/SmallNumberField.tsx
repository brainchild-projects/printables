import React, { useState, ChangeEvent, useEffect } from 'react';
import { FormControl, InputProps, TextField } from '@material-ui/core';
import './SmallNumberField.css';
import generateId from '../../lib/generateId';
import titleize from '../../lib/titlelize';

interface SmallNumberFieldProps {
  name: string;
  id?: string;
  label?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number | undefined;
  max?: number | undefined;
}

function SmallNumberField({
  name, id = undefined, label = undefined, value, onChange, min = 0, max,
}: SmallNumberFieldProps): JSX.Element {
  const theId = id ?? generateId('input-number', name);
  const theLabel = label ?? titleize(name);
  const [valueS, setValueS] = useState(value);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    const parsed = parseFloat(val);
    if (Number.isNaN(parsed)) {
      setValueS(parsed);
    } else {
      setValueS(parsed);
      onChange(parsed);
    }
  };
  useEffect(() => {
    setValueS(value);
  }, [value]);
  return (
    <FormControl>
      <TextField
        id={theId}
        value={valueS}
        name={name}
        margin="dense"
        onChange={handleChange}
        type="number"
        label={theLabel}
        variant="outlined"
        size="small"
        inputProps={{
          step: 1,
          min,
          max,
          type: 'number',
          className: 'hidden-spinners',
          'data-testid': theId,
        }}
      />
    </FormControl>
  );
}

SmallNumberField.defaultProps = {
  min: 0,
  max: undefined,
  id: undefined,
  label: undefined,
};

export default SmallNumberField;
