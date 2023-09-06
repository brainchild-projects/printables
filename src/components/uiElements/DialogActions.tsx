import classNames from 'classnames';
import React, { ComponentPropsWithRef } from 'react';
import styleIt from '../styleIt';
import AnyTag from './AnyTag';

const styles = styleIt(() => ({
  dialogActions: {
    margin: 0,
    padding: 8,
    flex: '0 0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
}));

const DEFAULT_TAG = 'div' as const;

type DialogActionsProps<Tag extends AnyTag> = {
  component: Tag;
  className?: string | undefined;
} & ComponentPropsWithRef<Tag>;

function DialogActions<Tag extends AnyTag>({
  component: Component = DEFAULT_TAG,
  className,
  ...other
}: DialogActionsProps<Tag>): JSX.Element {
  const classes = styles();
  return (
    <Component
      className={classNames(
        classes.dialogActions,
        className as string,
      )}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
    />
  );
}

DialogActions.defaultProps = {
  className: undefined,
};

export default DialogActions;


