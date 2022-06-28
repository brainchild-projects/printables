import React from 'react';
import CustomizeForm from '../../components/forms/CustomizeForm';
import SubtractionWithFiguresData, { ProblemGeneration, problemGenerationOptions } from './SubtractionWithFiguresData';
import NumberField from '../../components/forms/NumberField';
import SelectField from '../../components/forms/SelectField';
import stringMapToOptions from '../../components/forms/stringMapToOptions';
import NumberRangeSlider from '../../components/forms/NumberRangeSlider';

interface CustomizeSubtractionWithFiguresFormProps {
  onChange: (data: SubtractionWithFiguresData) => void;
  data: SubtractionWithFiguresData;
}

function CustomizeSubtractionWithFiguresForm({
  data, onChange,
}: CustomizeSubtractionWithFiguresFormProps): JSX.Element {
  const generationFields = data.problemGeneration === 'minuend'
    ? (
      <NumberRangeSlider
        label="Minuend"
        id="numberRangeMinuend"
        from={data.minuend.from}
        to={data.minuend.to}
        magnitude={2}
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
          magnitude={1}
          onChange={(subtrahend) => onChange({ ...data, subtrahend })}
        />
        <NumberRangeSlider
          label="Difference"
          id="numberRangeDifference"
          from={data.difference.from}
          to={data.difference.to}
          magnitude={1}
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
      <SelectField
        name="problemGeneration"
        label="Problem Generation"
        value={data.problemGeneration}
        onChange={(value: unknown) => {
          onChange({
            ...data,
            problemGeneration: value as ProblemGeneration,
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

export default CustomizeSubtractionWithFiguresForm;
