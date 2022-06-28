import React from 'react';
import CustomizeForm from '../../components/forms/CustomizeForm';
import NumberGridData from './NumberGridData';
import NumberField from '../../components/forms/NumberField';
import SwitchField from '../../components/forms/SwitchField';
import TextField from '../../components/forms/TextField';

interface CustomizeNumberGridFormProps {
  onChange: (data: NumberGridData) => void;
  data: NumberGridData;
}

function CustomizeNumberGridForm({
  data, onChange,
}: CustomizeNumberGridFormProps): JSX.Element {
  return (
    <CustomizeForm name="Worksheet">
      <SwitchField
        name="skipCountToggle"
        label="Skip Counting"
        value={data.skipCountToggle}
        onChange={(skipCountToggle) => onChange({ ...data, skipCountToggle })}
      />
      {
        data.skipCountToggle
          ? (
            <>

              <NumberField
                name="skipCount"
                label="Skip Count By"
                value={data.skipCount}
                onChange={(skipCount) => onChange({ ...data, skipCount })}
                min={2}
                max={100}
              />
              <SwitchField
                name="showAnswerKey"
                label="Show Answer Key"
                value={data.showAnswerKey}
                onChange={(showAnswerKey) => onChange({ ...data, showAnswerKey })}
              />
            </>
          )
          : null
      }
      <TextField
        name="customInstructions"
        label="Custom Instructions"
        value={data.customInstructions}
        onChange={(customInstructions) => onChange({ ...data, customInstructions })}
      />
    </CustomizeForm>
  );
}

export default CustomizeNumberGridForm;
