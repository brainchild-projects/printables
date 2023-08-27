import classNames from 'classnames';
import React, { ComponentPropsWithRef } from 'react';
import styleIt from '../styleIt';
import AnyTag from './AnyTag';

const styles = styleIt(() => ({
  container: {
    width: '100%',
    display: 'block',
    boxSizing: 'border-box',
    marginRight: 'auto',
    marginLeft: 'auto',
    paddingLeft: 16,
    paddingRight: 16,

    '@media (min-width: 600px)': {
      paddingLeft: 24,
      paddingRight: 24,
    },

    '&.maxWidthSm': {
      maxWidth: 600,
    },

    '&.maxWidthMd': {
      maxWidth: 960,
    },

    '&.maxWidthLg': {
      maxWidth: 1280,
    },
  },
}));

const DEFAULT_TAG = 'div' as const;

type ContainerProps<Tag extends AnyTag> = {
  component: Tag;
  className?: string | undefined;
  maxWidth?: string | undefined;
} & ComponentPropsWithRef<Tag>;

function Container<Tag extends AnyTag>(
  { component: Component = DEFAULT_TAG, className, maxWidth, ...other }: ContainerProps<Tag>,
): JSX.Element {
  const classes = styles();
  return (
    <Component
      className={classNames(
        classes.container,
        className as string,
        {
          maxWidthSm: maxWidth === 'sm',
          maxWidthMd: maxWidth === 'md',
          maxWidthLg: maxWidth === 'lg' || maxWidth === undefined,
        },
      )}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
    />
  );
}

Container.defaultProps = {
  className: undefined,
  maxWidth: undefined,
};

export default Container;
