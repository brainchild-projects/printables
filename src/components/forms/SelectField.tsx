import { Select } from '@mui/material';
import React from 'react';
import generateId from '../../lib/generateId.js';
import HtmlFieldChangeEvent from '../../lib/HtmlFieldChangeEvent.js';
import titleize from '../../lib/titlelize.js';
import FieldSet from './FieldSet.js';

interface SelectFieldProps<T extends string> {
  id?: string;
  name: string;
  label?: string;
  onChange: (value: T, event: HtmlFieldChangeEvent) => void;
  value: unknown;
  children?: React.ReactNode;
  'data-testid'?: string;
}

function SelectField<T extends string>(props: SelectFieldProps<T>): JSX.Element {
  const {
    id, name, label, onChange, value, children,
  } = props;
  const testId = props['data-testid'];
  const theId = id ?? generateId('select', name);
  const theLabel = label ?? titleize(name);
  return (
    <FieldSet
      label={theLabel}
      id={theId}
    >
      <Select
        native
        name={name}
        id={theId}
        fullWidth
        variant="filled"
        value={value}
        data-testid={testId}
        onChange={(event) => {
          onChange(event.target.value as T, event as HtmlFieldChangeEvent);
        }}
      >
        {children}
      </Select>
    </FieldSet>
  );
}

SelectField.defaultProps = {
  children: null,
  id: null,
  label: null,
  'data-testid': undefined,
};

export default SelectField;
