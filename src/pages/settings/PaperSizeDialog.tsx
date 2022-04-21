import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import ModalDialog from '../../components/ModalDialog';
import TextField from '../../components/forms/TextField';
import NumberField from '../../components/forms/NumberField';
import PaperSize, { PaperSizeJSON } from '../../lib/PaperSize';

interface PaperSizeDialogProps {
  paperSize: PaperSize | null;
  open: boolean;
  onSave: (saved: PaperSize) => void;
  onClose: () => void;
}
const defaultSize = {
  name: '',
  width: 200,
  height: 200,
};

function PaperSizeDialog({
  paperSize, open, onSave, onClose,
}: PaperSizeDialogProps): JSX.Element {
  const [size, setSize] = useState<PaperSizeJSON>(defaultSize);

  useEffect(() => {
    setSize(paperSize ? paperSize.toJSON() : defaultSize);
  }, [paperSize, open]);

  return (
    <ModalDialog
      title="Add Custom Paper Size"
      open={open}
      onClose={onClose}
      onSubmit={() => onSave(new PaperSize(size.name, { width: size.width, height: size.height }))}
      closeButtonText="Save Paper Size"
    >
      <TextField
        name="name"
        value={size.name}
        onChange={(name) => setSize({ ...size, name })}
        spaced
      />
      <Grid container spacing={1}>
        <Grid item>
          <NumberField
            name="width"
            label="Width (mm)"
            value={size.width}
            onChange={(width) => setSize({ ...size, width })}
            spaced
          />
        </Grid>
        <Grid item>
          <NumberField
            name="height"
            label="Height (mm)"
            value={size.height}
            onChange={(height) => setSize({ ...size, height })}
            spaced
          />
        </Grid>

      </Grid>
    </ModalDialog>
  );
}

export default PaperSizeDialog;
