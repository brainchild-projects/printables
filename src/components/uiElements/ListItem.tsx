import classNames from 'classnames';
import React, { ComponentType } from 'react';
import styleIt from '../styleIt';

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

type ListItemProps<Tag extends keyof JSX.IntrinsicElements = 'li'> = {
  component?: ComponentType | keyof JSX.IntrinsicElements;
  className?: string;
  button?: boolean;
} & JSX.IntrinsicElements[Tag];

function ListItem<Tag extends keyof JSX.IntrinsicElements = 'li'>(
  { component: Component = 'li', button, className, ...other }: ListItemProps<Tag>,
): JSX.Element {
  const classes = styles();
  return (
    <Component
      className={classNames(classes.listItem, className as string, button)}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
    />
  );
}

ListItem.defaultProps = {
  component: 'li',
  className: undefined,
  button: false,
};

export default ListItem;


