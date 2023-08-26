import classNames from 'classnames';
import React, { ComponentPropsWithRef } from 'react';
import styleIt from '../styleIt';
import AnyTag from './AnyTag';

const styles = styleIt(() => ({
  listItemIcon: {
    color: 'inherit',
    display: 'inline-flex',
    minWidth: 56,
    flexShrink: '0',
    boxSizing: 'inherit',
  },
}));

const DEFAULT_TAG = 'div' as const;

type ListItemIconProps<Tag extends AnyTag> = {
  component: Tag;
  className?: string | undefined;
} & ComponentPropsWithRef<Tag>;

function ListItemIcon<Tag extends AnyTag>(
  { component: Component = DEFAULT_TAG, className, ...other }: ListItemIconProps<Tag>,
): JSX.Element {
  const classes = styles();
  return (
    <Component
      className={classNames(classes.listItemIcon, className as string)}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
    />
  );
}

ListItemIcon.defaultProps = {
  className: undefined,
};

export default ListItemIcon;
