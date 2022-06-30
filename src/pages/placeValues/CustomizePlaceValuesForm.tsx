import Divider from '@material-ui/core/Divider';
import React from 'react';
import CustomizeForm from '../../components/forms/CustomizeForm';
import NumberField from '../../components/forms/NumberField';
import SelectField from '../../components/forms/SelectField';
import stringMapToOptions from '../../components/forms/stringMapToOptions';
import PlaceValuesData, {
  magnitudes, PlaceValueProblemType, PlaceValuesMagnitude, problemTypes,
} from './PlaceValuesData';

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
      <SelectField<PlaceValuesMagnitude>
        name="magnitude"
        value={data.magnitude}
        onChange={(magnitude) => onChange({ ...data, magnitude })}
      >
        {stringMapToOptions(magnitudes)}
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
