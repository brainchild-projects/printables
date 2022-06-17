import TextField from '@material-ui/core/TextField';
import React, { ChangeEvent, useEffect, useState } from 'react';
import generateId from '../../lib/generateId';
import parseEventValueAsFloat from '../../lib/parseEventValueAsFloat';
import parseEventValueAsInt from '../../lib/parseEventValueAsInt';
import titleize from '../../lib/titlelize';
import FieldSet from './FieldSet';

interface NumberFieldProps {
  name: string;
  id?: string;
  label?: string;
  onChange: (value: number, event: ChangeEvent) => void;
  value: number | string;
  min?: number;
  max?: number;
  step?: number;
  integer?: boolean;
  spaced?: boolean;
}

function NumberField({
  id, name, label, onChange, value, min, max, step, integer, spaced = false,
}: NumberFieldProps): JSX.Element {
  const theId = id ?? generateId('input-number', name);
  const theLabel = label ?? titleize(name);
  const [showValue, setShowValue] = useState<number | string>(value);

  useEffect(() => {
    setShowValue(showValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return (
    <FieldSet spaced={spaced}>
      <TextField
        type="number"
        name={name}
        id={theId}
        label={theLabel}
        InputLabelProps={{ shrink: true }}
        fullWidth
        variant="outlined"
        value={showValue}
        onChange={(e) => {
          const val: number = integer ? parseEventValueAsInt(e) : parseEventValueAsFloat(e);
          if (!Number.isNaN(val)) {
            onChange(val, e);
          }
          setShowValue(e.target.value);
        }}
        onBlur={() => {
          if (Number.isNaN(parseFloat(showValue.toString()))) {
            setShowValue(value);
          }
        }}
        inputProps={{ min, max, step }}
      />
    </FieldSet>
  );
}

NumberField.defaultProps = {
  min: null,
  max: null,
  step: null,
  id: null,
  label: null,
  integer: false,
  spaced: false,
};

export default NumberField;
