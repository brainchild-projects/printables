import React, { ReactNode } from 'react';
import Button from '@material-ui/core/Button';
import Modal from './uiElements/Modal';
import DialogTitle from './uiElements/DialogTitle';
import DialogContent from './uiElements/DialogContent';
import DialogActions from './uiElements/DialogActions';

interface ModalDialogProps {
  title: string;
  children: ReactNode;
  open: boolean;
  closeButtonText?: string;
  onClose: VoidFunction;
  onSubmit?: VoidFunction | undefined;
}


function ModalDialog({
  title, children, open, onClose, closeButtonText = 'Done', onSubmit,
}: ModalDialogProps): JSX.Element {

  return (
    <Modal
      open={open}
      onClose={onClose}
      autoFocus
    >
      <div
        role="dialog"
        aria-labelledby="customized-dialog-title"
      >
        <DialogTitle id="customized-dialog-title" onClose={onClose}>
          {title}
        </DialogTitle>
        <DialogContent dividers>
          {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={onSubmit ?? onClose} color="primary">
            {closeButtonText}
          </Button>
        </DialogActions>
      </div>
    </Modal >
  );
}

ModalDialog.defaultProps = {
  closeButtonText: 'Done',
  onSubmit: undefined,
};

export default ModalDialog;
