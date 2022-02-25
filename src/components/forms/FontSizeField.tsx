import React from 'react';
import { SelectInputProps } from '@material-ui/core/Select/SelectInput';
import SelectField from './SelectField';

const fontSizes = [
  8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72, 96,
];

interface FontSizeFieldProps {
  id?: string;
  name?: string;
  onChange: SelectInputProps['onChange'];
  value: number;
}

function FontSizeField({
  id = 'select-font-size', name = 'fontSize', onChange, value,
}: FontSizeFieldProps): JSX.Element {
  return (
    <SelectField
      label="Font Size"
      id={id}
      name={name}
      value={value}
      onChange={onChange}
    >
      {
        Array.from(fontSizes.values()).map((size) => (
          <option key={`font-size-${size}`} value={size}>{size}</option>
        ))
      }
    </SelectField>
  );
}

FontSizeField.defaultProps = {
  id: 'select-font-size',
  name: 'fontSize',
};

export default FontSizeField;
