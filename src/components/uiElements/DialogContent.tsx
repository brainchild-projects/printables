import classNames from 'classnames';
import React, { ComponentPropsWithRef } from 'react';
import styleIt from '../styleIt';
import AnyTag from './AnyTag';

const styles = styleIt(() => ({
  dialogContent: {
    padding: 16,
    flex: '1 1 auto',
    overflowY: 'auto',
    '-webkit-overflow-scrolling': 'touch',
  },
  dialogContentDividers: {
    borderTop: '1px solid rgba(0, 0, 0, 0.12)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
}));

const DEFAULT_TAG = 'div' as const;

type DialogContentProps<Tag extends AnyTag> = {
  component: Tag;
  className?: string | undefined;
  dividers: boolean;
} & ComponentPropsWithRef<Tag>;

function DialogContent<Tag extends AnyTag>({
  component: Component = DEFAULT_TAG,
  dividers = false,
  className,
  ...other
}: DialogContentProps<Tag>): JSX.Element {
  const classes = styles();
  return (
    <Component
      className={classNames(
        classes.dialogContent,
        { [classes.dialogContentDividers]: dividers as boolean },
        className as string,
      )}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
    />
  );
}

DialogContent.defaultProps = {
  className: undefined,
};

export default DialogContent;

