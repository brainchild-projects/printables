import classNames from 'classnames';
import React, { ComponentPropsWithRef } from 'react';
import styleIt from '../styleIt.js';
import AnyTag from './AnyTag.js';

const styles = styleIt(() => ({
  listItemSecondaryAction: {
    top: '50%',
    right: 16,
    position: 'absolute',
    transform: 'translateY(-50%)',
  },
}));

const DEFAULT_TAG = 'div' as const;

type ListItemSecondaryActionProps<Tag extends AnyTag> = {
  component: Tag;
  className?: string | undefined;
} & ComponentPropsWithRef<Tag>;

function ListItemSecondaryAction<Tag extends AnyTag>(
  { component: Component = DEFAULT_TAG, className, ...other }: ListItemSecondaryActionProps<Tag>,
): JSX.Element {
  const classes = styles();
  return (
    <Component
      className={classNames(classes.listItemSecondaryAction, className as string)}
      {...other}
    />
  );
}

ListItemSecondaryAction.defaultProps = {
  className: undefined,
};

export default ListItemSecondaryAction;

