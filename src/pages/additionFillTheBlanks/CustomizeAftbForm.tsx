/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, ChangeEvent } from 'react';
import { Divider } from '@material-ui/core';
import CustomizeForm from '../../components/forms/CustomizeForm';
import AftbData, { BlankPositionStrategy, ProblemGeneration, problemGenerations } from './AftbData';
import FieldSet from '../../components/forms/FieldSet';
import NumberRangeSlider from '../../components/forms/NumberRangeSlider';
import numberOrEmpty from '../../lib/numberOrEmpty';
import FontSizeField from '../../components/forms/FontSizeField';
import NumberField from '../../components/forms/NumberField';
import SelectField from '../../components/forms/SelectField';
import stringMapToOptions from '../../components/forms/stringMapToOptions';

export interface CustomizeAftbFormProps {
  onBeforePrint: (data: AftbData) => boolean,
  onChange: (data: AftbData) => void,
  initialData: AftbData,
}

const blankTypesStrategies = new Map<BlankPositionStrategy, string>([
  ['sum', 'Sum'],
  ['addends', 'Addends'],
  ['random', 'Random'],
]);

type ChangeSelectCallback<T> = (value: T, event: ChangeEvent<{ value: unknown }>) => void;
function changeSelect<T>(callback: ChangeSelectCallback<T>) {
  return (event: ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as T;
    callback(value, event);
  };
}

function CustomizeAftbForm({
  onBeforePrint, onChange,
  initialData,
}: CustomizeAftbFormProps): JSX.Element {
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

  const changeBlankStrategy = changeSelect<BlankPositionStrategy>((strategy) => {
    updateData({
      ...data,
      blankStrategy: strategy,
    });
  });

  const changeProblemGeneration = changeSelect<ProblemGeneration>((problemGeneration) => {
    updateData({
      ...data,
      problemGeneration,
    });
  });

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
      <NumberField
        name="problems"
        id="input-problems"
        label="Number of Problems"
        value={numberOrEmpty(data.problems)}
        onChange={changeHandler('problems')}
      />
      <SelectField
        label="Problem Generation"
        id="select-problem-generation"
        name="problemGeneration"
        value={data.problemGeneration}
        onChange={changeProblemGeneration}
      >
        {stringMapToOptions(problemGenerations)}
      </SelectField>
      {
        data.problemGeneration === 'single range'
          ? (
            <FieldSet>
              <NumberRangeSlider
                label="Number Range"
                from={data.rangeFrom}
                to={data.rangeTo}
                id="single-range-slider"
                data-test="single-range-slider"
                onChange={(event, { from, to }) => {
                  updateData({
                    ...data,
                    rangeFrom: from,
                    rangeTo: to,
                  });
                }}
              />
            </FieldSet>
          )
          : null
      }
      {
        data.problemGeneration === 'custom addends'
          ? (
            <>
              <FieldSet>
                <NumberRangeSlider
                  label="Addend A"
                  from={data.customAddendsA.from}
                  to={data.customAddendsA.to}
                  id="custom-addends-a-slider"
                  data-test="custom-addends-a-slider"
                  onChange={(event, { from, to }) => {
                    updateData({
                      ...data,
                      customAddendsA: { from, to },
                    });
                  }}
                />
              </FieldSet>
              <FieldSet>
                <NumberRangeSlider
                  label="Addend B"
                  from={data.customAddendsB.from}
                  to={data.customAddendsB.to}
                  id="custom-addends-b-slider"
                  data-test="custom-addends-b-slider"
                  onChange={(event, { from, to }) => {
                    updateData({
                      ...data,
                      customAddendsB: { from, to },
                    });
                  }}
                />
              </FieldSet>
            </>
          )
          : null
      }

      <SelectField
        label="Blank"
        id="select-blank-position-strategy"
        name="blankStrategy"
        value={data.blankStrategy}
        onChange={changeBlankStrategy}
      >
        {stringMapToOptions(blankTypesStrategies)}
      </SelectField>

      <Divider variant="middle" />
      <NumberField
        label="Columns"
        id="input-columns"
        name="columns"
        value={data.columns}
        onChange={changeHandler('columns')}
        min={1}
        max={10}
      />

      <FontSizeField
        value={data.fontSize}
        onChange={changeHandler('fontSize')}
      />
    </CustomizeForm>
  );
}

export default CustomizeAftbForm;
