import React from 'react';
import { Divider } from '@material-ui/core';
import CustomizeForm from '../../components/forms/CustomizeForm';
import TellingTimeData, { ProblemType, problemTypeOptions } from './TellingTimeData';
import NumberField from '../../components/forms/NumberField';
import numberOrEmpty from '../../lib/numberOrEmpty';
import SelectField from '../../components/forms/SelectField';
import stringMapToOptions from '../../components/forms/stringMapToOptions';

interface CustomizeTellingTimeFormProps {
  onChange: (data: TellingTimeData) => void;
  data: TellingTimeData;
}

function CustomizeTellingTimeForm({
  data, onChange,
}: CustomizeTellingTimeFormProps): JSX.Element {
  return (
    <CustomizeForm name="Worksheet">
      <NumberField
        name="count"
        label="Count"
        value={numberOrEmpty(data.count)}
        onChange={(count) => onChange({ ...data, count })}
      />
      <SelectField
        name="problemType"
        label="Problem Type"
        value={data.problemType}
        onChange={(value: unknown) => {
          onChange({
            ...data,
            problemType: value as ProblemType,
          });
        }}
      >
        {stringMapToOptions(problemTypeOptions)}
      </SelectField>
      <Divider variant="middle" />
      <NumberField
        name="columns"
        value={numberOrEmpty(data.columns)}
        onChange={(columns) => onChange({ ...data, columns })}
      />
    </CustomizeForm>
  );
}

export default CustomizeTellingTimeForm;
