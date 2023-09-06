import classNames from 'classnames';
import React, { ComponentPropsWithRef, ReactNode } from 'react';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import styleIt from '../styleIt';
import AnyTag from './AnyTag';
import Typography from './Typography';

const styles = styleIt(() => ({
  dialogTitle: {
    flex: '0 0 auto',
    margin: 0,
    padding: 16,
  },

  closeButton: {
    position: 'absolute',
    right: 8,
    top: 8,
    color: '#9e9e9e',
  },
}));

const DEFAULT_TAG = 'div' as const;

type DialogTitleProps<Tag extends AnyTag> = {
  component: Tag;
  className?: string | undefined;
  children?: ReactNode | undefined;
  onClose?: VoidFunction | undefined;
} & ComponentPropsWithRef<Tag>;

function DialogTitle<Tag extends AnyTag>({
  component: Component = DEFAULT_TAG,
  className,
  children,
  onClose,
  ...other
}: DialogTitleProps<Tag>): JSX.Element {
  const classes = styles();
  return (
    <Component
      className={classNames(classes.dialogTitle, className as string)}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
    >
      <Typography variant="h6" component="div">
        {children}
      </Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose as VoidFunction}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </Component>
  );
}

DialogTitle.defaultProps = {
  className: undefined,
  children: undefined,
  onClose: undefined,
};

export default DialogTitle;

