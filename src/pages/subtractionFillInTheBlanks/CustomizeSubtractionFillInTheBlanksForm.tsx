import React from 'react';
import { Divider } from '@material-ui/core';
import CustomizeForm from '../../components/forms/CustomizeForm';
import SubtractionFillInTheBlanksData, {
  BlankPosition, blankPositions, ProblemGeneration, problemGenerationOptions,
} from './SubtractionFillInTheBlanksData';
import NumberField from '../../components/forms/NumberField';
import SelectField from '../../components/forms/SelectField';
import stringMapToOptions from '../../components/forms/stringMapToOptions';
import NumberRangeSlider from '../../components/forms/NumberRangeSlider';
import FontSizeField from '../../components/forms/FontSizeField';

interface CustomizeSubtractionFillInTheBlanksFormProps {
  onChange: (data: SubtractionFillInTheBlanksData) => void;
  data: SubtractionFillInTheBlanksData;
}

function CustomizeSubtractionFillInTheBlanksForm({
  data, onChange,
}: CustomizeSubtractionFillInTheBlanksFormProps): JSX.Element {
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
          magnitude={2}
          onChange={(subtrahend) => onChange({ ...data, subtrahend })}
        />
        <NumberRangeSlider
          label="Difference"
          id="numberRangeDifference"
          from={data.difference.from}
          to={data.difference.to}
          magnitude={2}
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

      <SelectField
        name="blankPosition"
        label="Blank Position"
        value={data.blankPosition}
        onChange={(value: unknown) => {
          onChange({
            ...data,
            blankPosition: value as BlankPosition,
          });
        }}
      >
        {stringMapToOptions(blankPositions)}
      </SelectField>

      <Divider variant="middle" />
      <NumberField
        name="columns"
        label="Columns"
        value={data.columns}
        onChange={(columns) => onChange({ ...data, columns })}
      />
      <FontSizeField
        value={data.fontSize}
        onChange={(fontSize) => onChange({ ...data, fontSize })}
      />
    </CustomizeForm>
  );
}

export default CustomizeSubtractionFillInTheBlanksForm;
