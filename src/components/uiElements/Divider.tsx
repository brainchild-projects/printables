import classNames from 'classnames';
import React, { ComponentPropsWithRef } from 'react';
import styleIt from '../styleIt';
import AnyTag from './AnyTag';
import theme from './theme';

type Variant = 'fullWidth' | 'inset' | 'middle';

const styles = styleIt(() => ({
  divider: {
    border: 'none',
    height: 1,
    margin: 0,
    backgroundColor: theme.colors.transparentBlack,
    flexShrink: 0,
  },
  '!.divider-dark': {
    backgroundColor: theme.colors.transparentWhite,
  },
  '!.divider-variant-fullWidth': {
    width: '100%',
  },
  '!.divider-variant-inset': {
    marginLeft: 72,
  },
  '!.divider-variant-middle': {
    marginLeft: 16,
    marginRight: 16,
  },
}));

const DEFAULT_TAG = 'hr' as const;

type DividerProps<Tag extends AnyTag> = {
  component: Tag;
  variant?: Variant | undefined;
  className?: string | undefined;
  dark?: boolean | undefined;
} & ComponentPropsWithRef<Tag>;

function Divider<Tag extends AnyTag>({
  component: Component = DEFAULT_TAG,
  className,
  variant,
  dark,
  ...other
}: DividerProps<Tag>): JSX.Element {
  const classes = styles();
  return (
    <Component
      className={classNames(
        classes.divider,
        className as string,
        {
          'divider-dark': dark as boolean,
          'divider-variant-fullWidth': !variant || variant === 'fullWidth',
          'divider-variant-inset': variant === 'inset',
          'divider-variant-middle': variant === 'middle',
        },
      )}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
    />
  );
}

Divider.defaultProps = {
  className: undefined,
  variant: undefined,
  dark: false,
};

export default Divider;

