import classNames from 'classnames';
import React, { ComponentPropsWithRef } from 'react';
import styleIt from '../styleIt';
import AnyTag from './AnyTag';

const styles = styleIt(() => ({
  listItem: {
    padding: [8, 16],
    width: '100%',
    display: 'flex',
    position: 'relative',
    boxSizing: 'border-box',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'flex-start',
    textDecoration: 'none',

    '&.button': {
      transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      color: 'inherit',
      border: 0,
      cursor: 'pointer',
      margin: 0,
      outline: 0,
      borderRadius: 0,
      verticalAlign: 'middle',
      backgroundColor: 'transparent',
      '-moz-appearance': 'none',
      '-webkit-appearance': 'none',
      '-webkit-tap-highlight-color': 'transparent',
      '-moz-user-select': 'none',
    },
  },
}));

const DEFAULT_TAG = 'li' as const;

type ListItemProps<Tag extends AnyTag> = {
  component: Tag;
  className?: string | undefined;
  button?: boolean;
} & ComponentPropsWithRef<Tag>;

function ListItem<Tag extends AnyTag>(
  { component: Component = DEFAULT_TAG, button, className, ...other }: ListItemProps<Tag>,
): JSX.Element {
  const classes = styles();
  return (
    <Component
      className={classNames(classes.listItem, className as string, button as boolean)}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
    />
  );
}

ListItem.defaultProps = {
  className: undefined,
  button: false,
};

export default ListItem;


