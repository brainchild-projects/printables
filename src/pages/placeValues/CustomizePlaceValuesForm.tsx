import React from 'react';
import CustomizeForm from '../../components/forms/CustomizeForm';
import NumberField from '../../components/forms/NumberField';
import SelectField from '../../components/forms/SelectField';
import stringMapToOptions from '../../components/forms/stringMapToOptions';
import numberOrEmpty from '../../lib/numberOrEmpty';
import PlaceValuesData, { PlaceValueProblemType } from './PlaceValuesData';

const problemTypes: Map<PlaceValueProblemType, string> = new Map([
  ['blanks', 'Fill in the Blanks'], ['choice', 'Multiple Choice'],
]);

const magnitudes: Map<string, string> = new Map([
  ['tens', 'Tens'], ['hundreds', 'Hundreds'],
]);

interface CustomizePlaceValuesFormProps {
  onChange: (data: PlaceValuesData) => void;
  data: PlaceValuesData;
}

function CustomizePlaceValuesForm({
  data, onChange,
}: CustomizePlaceValuesFormProps): JSX.Element {
  return (
    <CustomizeForm
      onBeforePrint={() => true}
      name="Worksheet"
    >
      <SelectField
        name="problemType"
        value={data.solution}
        onChange={(value) => onChange({ ...data, solution: value as PlaceValueProblemType })}
      >
        {stringMapToOptions(problemTypes)}
      </SelectField>
      <NumberField
        name="count"
        label="Number of Problems"
        value={numberOrEmpty(data.count)}
        onChange={(count) => onChange({ ...data, count })}
      />
      <SelectField
        name="magnitude"
        value={data.magnitude}
        onChange={(value) => onChange({ ...data, magnitude: value })}
      >
        {stringMapToOptions(magnitudes)}
      </SelectField>
    </CustomizeForm>
  );
}

export default CustomizePlaceValuesForm;
