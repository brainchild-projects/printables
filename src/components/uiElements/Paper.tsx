import classNames from 'classnames';
import React, { ComponentPropsWithRef } from 'react';
import styleIt from '../styleIt';
import AnyTag from './AnyTag';

const styles = styleIt(() => ({
  paper: {
    color: 'rgba(0, 0, 0, 0.87)',
    borderRadius: 4,
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
    backgroundColor: '#ffffff',
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
