/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Divider } from '@material-ui/core';
import CustomizeForm from '../../components/forms/CustomizeForm';
import AdditionSubtractionData, { ProblemGeneration, problemGenerations } from './AdditionSubtractionData';
import FieldSet from '../../components/forms/FieldSet';
import NumberRangeSlider from '../../components/forms/NumberRangeSlider';
import FontSizeField from '../../components/forms/FontSizeField';
import NumberField from '../../components/forms/NumberField';
import SelectField from '../../components/forms/SelectField';
import stringMapToOptions from '../../components/forms/stringMapToOptions';
import SwitchField from '../../components/forms/SwitchField';

export interface CustomizeAdditionSubtractionFormProps {
  onChange: (data: AdditionSubtractionData) => void,
  data: AdditionSubtractionData,
}

function CustomizeAdditionSubtractionForm({
  onChange,
  data,
}: CustomizeAdditionSubtractionFormProps): JSX.Element {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validate = ({ rangeFrom, rangeTo }: AdditionSubtractionData): string | null => {
    if (rangeFrom > rangeTo) {
      return 'Number range "From" must be less than "To"';
    }

    return null;
  };

  const updateData = (updated: AdditionSubtractionData): void => {
    const error = validate(updated);
    if (error !== errorMessage) {
      setErrorMessage(error);
    }
    if (!error) {
      onChange(updated);
    }
  };

  const changeProblemGeneration = (value: unknown) => {
    updateData({
      ...data,
      problemGeneration: value as ProblemGeneration,
    });
  };

  const changeHandler = (field: string) => (value: number | boolean) => {
    updateData({
      ...data,
      [field]: value,
    });
  };

  return (
    <CustomizeForm
      name="Worksheet"
      error={errorMessage}
    >
      <NumberField
        name="problems"
        label="Number of Problems"
        value={data.count}
        onChange={changeHandler('problems')}
      />
      <SelectField
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
                onChange={({ from, to }) => {
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
                  onChange={({ from, to }) => {
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
                  onChange={({ from, to }) => {
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

      <SwitchField
        name="blanksOnAddition"
        label="Blanks on Addition"
        onChange={changeHandler('blanksOnAddition')}
        value={data.blanksOnAddition}
      />
      <Divider variant="middle" />
      <NumberField
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

export default CustomizeAdditionSubtractionForm;
