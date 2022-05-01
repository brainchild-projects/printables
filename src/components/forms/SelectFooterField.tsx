import React from 'react';
import { footerNames } from '../printElements/Footers';
import arrayToOptions from './arrayToOptions';
import SelectField from './SelectField';

interface SelectFooterFieldProps {
  value: string;
  onChange: (value: string) => void;
}

function SelectFooterField({
  value, onChange,
}: SelectFooterFieldProps): JSX.Element {
  return (
    <SelectField
      name="Footer"
      value={value}
      onChange={onChange}
    >
      <option>None</option>
      {
        arrayToOptions(footerNames)
      }
    </SelectField>
  );
}

export default SelectFooterField;
