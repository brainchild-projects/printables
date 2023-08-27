import classNames from 'classnames';
import React, { ComponentPropsWithRef, ReactNode } from 'react';
import { Typography } from '@material-ui/core';
import styleIt from '../styleIt';
import AnyTag from './AnyTag';

const styles = styleIt(() => ({
  listItemText: {
    flex: '1 1 auto',
    minWidth: 0,
    marginTop: 4,
    marginBottom: 4,

    '.secondary': {
      color: 'rgba(0, 0, 0, 0.54)',
    },
  },
}));

const DEFAULT_TAG = 'div' as const;

type ListItemTextProps<Tag extends AnyTag> = {
  component: Tag;
  className?: string | undefined;
  primary?: ReactNode;
  secondary?: ReactNode;
  children?: ReactNode;
} & ComponentPropsWithRef<Tag>;

function LitItemText<Tag extends AnyTag>(
  {
    component: Component = DEFAULT_TAG,
    children, primary, secondary, className, ...other
  }: ListItemTextProps<Tag>,
): JSX.Element {
  const classes = styles();
  return (
    <Component
      className={classNames(classes.listItemText, className as string)}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
    >
      <Typography variant="body1" component='div'>{primary ?? children}</Typography>
      {
        secondary && (
          <Typography variant="body2" component='div' className="secondary">{secondary}</Typography>
        )
      }
    </Component>
  );
}

LitItemText.defaultProps = {
  className: undefined,
  primary: undefined,
  secondary: undefined,
  children: undefined,
};

export default LitItemText;

