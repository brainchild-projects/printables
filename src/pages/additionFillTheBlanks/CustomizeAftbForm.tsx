/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, ChangeEvent } from 'react';
import { TextField } from '@material-ui/core';
import CustomizeForm from '../../components/forms/CustomizeForm';
import AftbData from './AftbData';
import FieldSet from '../../components/forms/FieldSet';

export interface CustomizeAftbFormProps {
  onBeforePrint: (data: AftbData) => boolean,
  onChange: (data: AftbData) => void,
}

function numberOrEmpty(value: unknown): number | string {
  return Number.isNaN(value) ? '' : value as number;
}

const CustomizeAftbForm = ({
  onBeforePrint, onChange,
}: CustomizeAftbFormProps): JSX.Element => {
  const [data, setData] = useState<AftbData>({
    rangeFrom: 0,
    rangeTo: 9,
    problems: 10,
  });

  const changeHandler = (field: string) => (event: ChangeEvent<{ value: unknown, }>) => {
    const value = Number.parseInt(event.target.value as string, 10);
    const updated = {
      ...data,
      [field]: value,
    };
    setData(updated);
    onChange(updated);
  };

  return (
    <CustomizeForm
      onBeforePrint={() => onBeforePrint(data)}
      name="Worksheet"
    >
      <FieldSet>
        <TextField
          type="number"
          name="problems"
          id="input-problems"
          label="Number of Problems"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          variant="filled"
          value={numberOrEmpty(data.problems)}
          onChange={changeHandler('problems')}
        />
      </FieldSet>
      <FieldSet>
        <TextField
          type="number"
          name="rangeFrom"
          id="input-range-from"
          label="From"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          variant="filled"
          value={numberOrEmpty(data.rangeFrom)}
          onChange={changeHandler('rangeFrom')}
        />
      </FieldSet>
      <FieldSet>
        <TextField
          type="number"
          name="rangeTo"
          id="input-range-to"
          label="To"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          variant="filled"
          value={numberOrEmpty(data.rangeTo)}
          onChange={changeHandler('rangeTo')}
        />
      </FieldSet>
    </CustomizeForm>
  );
};

export default CustomizeAftbForm;
