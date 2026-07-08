import React from 'react';
import CustomizeForm from '../../components/forms/CustomizeForm.js';
import VerticalSubtractionData, { ProblemGeneration, problemGenerationOptions } from './VerticalSubtractionData.js';
import SelectField from '../../components/forms/SelectField.js';
import stringMapToOptions from '../../components/forms/stringMapToOptions.js';
import NumberField from '../../components/forms/NumberField.js';
import NumberRangeSlider from '../../components/forms/NumberRangeSlider.js';

interface CustomizeVerticalSubtractionFormProps {
  data: VerticalSubtractionData;
  onChange: (data: VerticalSubtractionData) => void;
}

function CustomizeVerticalSubtractionForm({
  data, onChange,
}: CustomizeVerticalSubtractionFormProps): JSX.Element {

  const generationFields = data.problemGeneration === 'minuend'
    ? (
      <NumberRangeSlider
        label="Minuend"
        id="numberRangeMinuend"
        from={data.minuend.from}
        to={data.minuend.to}
        magnitude={4}
        onChange={(minuend) => onChange({ ...data, minuend })}
      />
    )
    : (
      <>
        <NumberRangeSlider
          label="Subtrahend"
          id="numberRangeSubtrahend"
          from={data.subtrahend.from}
          to={data.subtrahend.to}
          magnitude={4}
          onChange={(subtrahend) => onChange({ ...data, subtrahend })}
        />
        <NumberRangeSlider
          label="Difference"
          id="numberRangeDifference"
          from={data.difference.from}
          to={data.difference.to}
          magnitude={4}
          onChange={(difference) => onChange({ ...data, difference })}
        />
      </>
    );

  return (
    <CustomizeForm name="Worksheet">
      <NumberField
        name="count"
        label="Count"
        value={data.count}
        onChange={(count) => onChange({ ...data, count })}
      />

      <SelectField<ProblemGeneration>
        name="problemGeneration"
        label="Problem Generation"
        value={data.problemGeneration}
        onChange={(value: ProblemGeneration) => {
          onChange({
            ...data,
            problemGeneration: value,
          });
        }}
      >
        {stringMapToOptions(problemGenerationOptions)}
      </SelectField>
      {generationFields}
      <NumberField
        name="columns"
        label="Columns"
        value={data.columns}
        onChange={(columns) => onChange({ ...data, columns })}
      />
    </CustomizeForm>
  );
}

export default CustomizeVerticalSubtractionForm;
