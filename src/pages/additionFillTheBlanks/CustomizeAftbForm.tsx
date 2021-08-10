/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, ChangeEvent } from 'react';
import {
  Select, TextField, Typography,
} from '@material-ui/core';
import CustomizeForm from '../../components/forms/CustomizeForm';
import AftbData, { BlankPositionStrategy } from './AftbData';
import FieldSet from '../../components/forms/FieldSet';
import NumberRangeSlider from '../../components/forms/NumberRangeSlider';

export interface CustomizeAftbFormProps {
  onBeforePrint: (data: AftbData) => boolean,
  onChange: (data: AftbData) => void,
  initialData: AftbData,
}

function numberOrEmpty(value: unknown): number | string {
  return Number.isNaN(value) ? '' : value as number;
}

const blankTypesStrategies = new Map<BlankPositionStrategy, string>([
  ['sum', 'Sum'],
  ['addends', 'Addends'],
  ['random', 'Random'],
]);

const CustomizeAftbForm = ({
  onBeforePrint, onChange,
  initialData,
}: CustomizeAftbFormProps): JSX.Element => {
  const [data, setData] = useState<AftbData>(initialData);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validate = ({ rangeFrom, rangeTo }: AftbData): string | null => {
    if (rangeFrom > rangeTo) {
      return 'Number range "From" must be less than "To"';
    }

    return null;
  };

  const updateData = (updated: AftbData): void => {
    const error = validate(updated);
    if (error !== errorMessage) {
      setErrorMessage(error);
    }
    if (!error) {
      onChange(updated);
    }
    setData(updated);
  };

  const changeBlankStrategy = (event: ChangeEvent<{ value: unknown }>) => {
    const strategy = event.target.value as BlankPositionStrategy;

    updateData({
      ...data,
      blankStrategy: strategy,
    });
  };

  const changeHandler = (field: string) => (event: ChangeEvent<{ value: unknown, }>) => {
    const value = Number.parseInt(event.target.value as string, 10);
    updateData({
      ...data,
      [field]: value,
    });
  };

  return (
    <CustomizeForm
      onBeforePrint={() => onBeforePrint(data)}
      name="Worksheet"
      error={errorMessage}
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
        <Typography
          id="single-range-slider"
          style={{ margin: '20px 0 50px' }}
        >
          Number Range
        </Typography>
        <NumberRangeSlider
          from={data.rangeFrom}
          to={data.rangeTo}
          aria-labelledby="single-range-slider"
          data-cy="single-range-slider"
          onChange={(event, { from, to }) => {
            updateData({
              ...data,
              rangeFrom: from,
              rangeTo: to,
            });
          }}
        />
      </FieldSet>
      <FieldSet
        label="Blank"
        id="select-blank-position-strategy"
      >
        <Select
          native
          name="blankStrategy"
          id="select-blank-position-strategy"
          fullWidth
          variant="filled"
          value={data.blankStrategy}
          onChange={changeBlankStrategy}
        >
          {
            Array.from(blankTypesStrategies.entries()).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))
          }
        </Select>
      </FieldSet>
    </CustomizeForm>
  );
};

export default CustomizeAftbForm;
