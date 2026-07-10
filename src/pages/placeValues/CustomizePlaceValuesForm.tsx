import React from 'react';
import arrayToOptions from '../../components/forms/arrayToOptions.js';
import CustomizeForm from '../../components/forms/CustomizeForm.js';
import NumberField from '../../components/forms/NumberField.js';
import SelectField from '../../components/forms/SelectField.js';
import stringMapToOptions from '../../components/forms/stringMapToOptions.js';
import { Magnitude, magnitudes } from '../../lib/math/magnitude.js';
import PlaceValuesData, {
  PlaceValueProblemType, problemTypes,
} from './PlaceValuesData.js';
import Divider from '../../components/uiElements/Divider.js';

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
      <SelectField<PlaceValueProblemType>
        name="problemType"
        value={data.solution}
        onChange={(value) => onChange({ ...data, solution: value })}
      >
        {stringMapToOptions(problemTypes)}
      </SelectField>
      <NumberField
        name="count"
        label="Number of Problems"
        value={data.count}
        onChange={(count) => onChange({ ...data, count })}
      />
      <SelectField<Magnitude>
        name="magnitude"
        value={data.magnitude}
        onChange={(magnitude) => onChange({ ...data, magnitude })}
      >
        {arrayToOptions(magnitudes, true)}
      </SelectField>

      <Divider variant="middle" />
      <NumberField
        name="columns"
        value={data.columns}
        onChange={(columns) => onChange({ ...data, columns })}
        min={1}
        max={10}
      />
    </CustomizeForm>
  );
}

export default CustomizePlaceValuesForm;
