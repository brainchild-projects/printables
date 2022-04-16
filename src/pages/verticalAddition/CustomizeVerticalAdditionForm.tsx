import React from 'react';
import CustomizeForm from '../../components/forms/CustomizeForm';
import VerticalAdditionData, { ProblemGeneration, problemGenerationOptions } from './VerticalAdditionData';
import NumberField from '../../components/forms/NumberField';
import numberOrEmpty from '../../lib/numberOrEmpty';
import NumberRangeSlider from '../../components/forms/NumberRangeSlider';
import SelectField from '../../components/forms/SelectField';
import stringMapToOptions from '../../components/forms/stringMapToOptions';

interface CustomizeVerticalAdditionFormProps {
  onChange: (data: VerticalAdditionData) => void;
  data: VerticalAdditionData;
}

function CustomizeVerticalAdditionForm({
  data, onChange,
}: CustomizeVerticalAdditionFormProps): JSX.Element {
  const { problemGeneration } = data;
  const rangeSliders = problemGeneration === 'single range'
    ? (
      <NumberRangeSlider
        label="Range"
        id="numberRangeRange"
        from={data.range.from}
        to={data.range.to}
        magnitude={3}
        onChange={(range) => onChange({ ...data, range })}
      />
    )
    : (
      <>
        <NumberRangeSlider
          label="Custom Addends A"
          id="numberRangeCustomAddendsA"
          from={data.customAddendsA.from}
          to={data.customAddendsA.to}
          magnitude={3}
          onChange={(customAddendsA) => onChange({ ...data, customAddendsA })}
        />
        <NumberRangeSlider
          label="Custom Addends B"
          id="numberRangeCustomAddendsB"
          from={data.customAddendsB.from}
          to={data.customAddendsB.to}
          magnitude={3}
          onChange={(customAddendsB) => onChange({ ...data, customAddendsB })}
        />
      </>
    );
  return (
    <CustomizeForm name="Worksheet">
      <NumberField
        name="count"
        label="Count"
        value={numberOrEmpty(data.count)}
        onChange={(count) => onChange({ ...data, count })}
      />
      <SelectField
        name="problemGeneration"
        label="Problem Generation"
        value={problemGeneration}
        onChange={(value: unknown) => {
          onChange({
            ...data,
            problemGeneration: value as ProblemGeneration,
          });
        }}
      >
        {stringMapToOptions(problemGenerationOptions)}
      </SelectField>
      {rangeSliders}
      <NumberField
        name="columns"
        label="Columns"
        value={numberOrEmpty(data.columns)}
        onChange={(columns) => onChange({ ...data, columns })}
      />
    </CustomizeForm>
  );
}

export default CustomizeVerticalAdditionForm;
