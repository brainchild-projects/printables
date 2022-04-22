import React, { FormEvent, useState } from 'react';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SettingsData from './SettingsData';
import SelectPaperSizeField from '../../components/forms/SelectPaperSizeField';
import FormContainer from '../../components/forms/FormContainer';
import SectionPageTitle from '../../elements/SectionPageTitle';
import PaperSizeDialog from './PaperSizeDialog';
import PaperSize from '../../lib/PaperSize';
import PaperSizeList from './PaperSizeList';
import { paperSizeArray } from '../../lib/paperSizes';

interface SettingsFormProps {
  onChange: (data: SettingsData) => void;
  data: SettingsData;
}

function editOrAdd(
  saved: PaperSize,
  editing: PaperSize | null,
  paperSizes: PaperSize[],
): PaperSize[] {
  const customPaperSizes = [...paperSizes];
  const found = customPaperSizes.find((size) => (size === editing));
  if (found) {
    const index = customPaperSizes.indexOf(found);
    customPaperSizes.splice(index, 1, saved);
  } else {
    customPaperSizes.push(saved);
  }
  return customPaperSizes;
}

function deleteFromSizes(toDelete: PaperSize, sizes: PaperSize[]) {
  const customPaperSizes = [...sizes];
  const found = customPaperSizes.find((size) => size === toDelete);
  if (found) {
    const index = customPaperSizes.indexOf(found);
    customPaperSizes.splice(index, 1);
  }
  return customPaperSizes;
}

function SettingsForm({
  data, onChange,
}: SettingsFormProps): JSX.Element {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  const [openPaperSizesDialog, setOpenPaperSizesDialog] = useState<boolean>(false);
  const [editingSize, setEditingSize] = useState<PaperSize | null>(null);

  const savePaperSize = (saved: PaperSize) => {
    const customPaperSizes = editOrAdd(saved, editingSize, data.customPaperSizes);
    onChange({ ...data, customPaperSizes });

    if (editingSize) {
      setEditingSize(null);
    }
    setOpenPaperSizesDialog(false);
  };

  const onDeletePaperSize = (toDelete: PaperSize) => {
    const customPaperSizes = deleteFromSizes(toDelete, data.customPaperSizes);
    onChange({ ...data, customPaperSizes });
  };

  return (
    <FormContainer
      onSubmit={onSubmit}
    >
      <section aria-label="Paper Sizes">
        <SectionPageTitle>Paper Sizes</SectionPageTitle>
        <SelectPaperSizeField
          name="defaultPaperSize"
          onChange={(defaultPaperSize) => onChange({ ...data, defaultPaperSize })}
          value={data.defaultPaperSize}
          paperSizes={[
            ...paperSizeArray,
            ...data.customPaperSizes,
          ]}
        />

        <SectionPageTitle
          level={2}
          endAction={(
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon>Add</AddIcon>}
              onClick={() => setOpenPaperSizesDialog(true)}
            >
              Add
            </Button>
          )}
        >
          Custom Paper Sizes
        </SectionPageTitle>
        <PaperSizeDialog
          open={openPaperSizesDialog || !!editingSize}
          paperSize={editingSize}
          onSave={savePaperSize}
          onClose={() => {
            setOpenPaperSizesDialog(false);
            setEditingSize(null);
          }}
        />
        <PaperSizeList
          paperSizes={data.customPaperSizes}
          onEdit={(size) => {
            setEditingSize(size);
          }}
          onDelete={onDeletePaperSize}
        />
      </section>
    </FormContainer>
  );
}

export default SettingsForm;
