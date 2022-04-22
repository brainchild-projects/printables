import { Typography } from '@material-ui/core';
import React from 'react';
import ModalDialog from '../ModalDialog';

interface PrintHelpDialogProps {
  open: boolean;
  onClose: VoidFunction;
}

function PrintHelpDialog({
  open, onClose,
}: PrintHelpDialogProps): JSX.Element {
  return (
    <ModalDialog
      title="Printing Tips"
      open={open}
      onClose={onClose}
      closeButtonText="Got it"
    >
      <Typography gutterBottom>
        Make sure to match the paper size and orientation
        on your browser&rsquo;s printer settings.
        <br />
      </Typography>
      <Typography gutterBottom variant="h6" component="h2">Firefox Users</Typography>
      <Typography gutterBottom>
        On the print dialog, please set
      </Typography>
      <Typography component="ul" gutterBottom>
        <li>
          <strong>Scale:</strong>
          {' '}
          “100” instead of &quot;Fit to page width&quot;
        </li>
        <li>
          <strong>Margins:</strong>
          {' '}
          &quot;Default&quot;
        </li>
      </Typography>
    </ModalDialog>
  );
}

export default PrintHelpDialog;
