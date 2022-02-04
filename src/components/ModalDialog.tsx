import React, { ReactNode } from 'react';
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

interface ModalDialogProps {
  title: string;
  children: ReactNode;
  open: boolean;
  closeButtonText?: string;
  onClose: () => void;
}

const ModalDialog = ({
  title, children, open, onClose, closeButtonText = 'Done',
}: ModalDialogProps): JSX.Element => (
  <Dialog
    onClose={onClose}
    aria-labelledby="customized-dialog-title"
    open={open}
    className="no-print"
  >
    <DialogTitle id="customized-dialog-title" onClose={onClose}>
      { title }
    </DialogTitle>
    <DialogContent dividers>
      { children }
    </DialogContent>
    <DialogActions>
      <Button autoFocus onClick={onClose} color="primary">
        { closeButtonText }
      </Button>
    </DialogActions>
  </Dialog>
);

ModalDialog.defaultProps = {
  closeButtonText: 'Done',
};

export default ModalDialog;
