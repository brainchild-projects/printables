import React, { FormEvent } from 'react';
import SettingsData from './SettingsData';
import SelectPaperSizeField from '../../components/forms/SelectPaperSizeField';
import FormContainer from '../../components/forms/FormContainer';
import SubmitButton from '../../components/forms/SubmitButton';

interface CustomizeSettingsFormProps {
  onChange: (data: SettingsData) => void;
  data: SettingsData;
}

function CustomizeSettingsForm({
  data, onChange,
}: CustomizeSettingsFormProps): JSX.Element {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <FormContainer
      onSubmit={onSubmit}
    >
      <SelectPaperSizeField
        name="defaultPaperSize"
        onChange={(defaultPaperSize) => onChange({ ...data, defaultPaperSize })}
        value={data.defaultPaperSize}
      />
      <SubmitButton
        value="submit"
        name="submit"
      >
        Save Changes
      </SubmitButton>
    </FormContainer>
  );
}

export default CustomizeSettingsForm;
