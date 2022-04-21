import React, { ReactNode, useState } from 'react';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createTheme';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = (theme: Theme) => createStyles({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

interface DialogTitleProps extends WithStyles<typeof styles> {
  onClose: () => void;
  children: ReactNode;
  id?: string;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const {
    children, classes, onClose, ...other
  } = props;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

type VoidFn = () => void;

interface ModalDialogProps {
  title: string;
  children: ReactNode;
  open: boolean;
  closeButtonText?: string;
  onClose: VoidFn;
  onSubmit?: VoidFn | undefined;
}

function ModalDialog({
  title, children, open, onClose, closeButtonText = 'Done', onSubmit,
}: ModalDialogProps): JSX.Element {
  const [focused, setFocused] = useState<boolean>(false);
  const onFocus = () => {
    if (!focused) {
      const input: HTMLInputElement | null = document.querySelector<HTMLInputElement>('[role="dialog"] input');
      if (input !== null) {
        input.focus();
      }
      setFocused(true);
    }
  };
  const myClose = () => {
    setFocused(false);
    onClose();
  };

  const mySubmit = () => {
    setFocused(false);
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <Dialog
      onClose={myClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      className="no-print"
      onFocus={onFocus}
    >
      <DialogTitle id="customized-dialog-title" onClose={myClose}>
        {title}
      </DialogTitle>
      <DialogContent dividers>
        {children}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onSubmit ? mySubmit : myClose} color="primary">
          {closeButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ModalDialog.defaultProps = {
  closeButtonText: 'Done',
  onSubmit: undefined,
};

export default ModalDialog;
