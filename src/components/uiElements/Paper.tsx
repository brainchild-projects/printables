import classNames from 'classnames';
import React, { ComponentPropsWithRef } from 'react';
import styleIt from '../styleIt';
import AnyTag from './AnyTag';
import theme from './theme';

const styles = styleIt(() => ({
  paper: {
    color: theme.colors.paperColor,
    borderRadius: 4,
    backgroundColor: theme.colors.paperBackgroundColor,
    boxShadow: `0px 2px 1px -1px ${theme.colors.boxShadow1},0px 1px 1px 0px ${theme.colors.boxShadow2},0px 1px 3px 0px ${theme.colors.boxShadow1}}`,
  },
}));

type PaperProps<Tag extends AnyTag = 'div'> = {
  component?: Tag;
  className?: string | undefined;
} & ComponentPropsWithRef<Tag>;

function Paper<Tag extends AnyTag = 'div'>(
  { component: Component = 'div' as Tag, className, ...other }: PaperProps<Tag>,
): JSX.Element {
  const classes = styles();
  return (
    <Component
      className={classNames(classes.paper, className as string)}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
    />
  );
}

Paper.defaultProps = {
  component: 'div',
  className: undefined,
};

export default Paper;
