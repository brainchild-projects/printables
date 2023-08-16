import classNames from 'classnames';
import React from 'react';
import styleIt from '../styleIt';
import AnyTag from './AnyTag';
import PropsOf from './PropsOf';

const styles = styleIt(() => ({
  paper: {
    color: 'rgba(0, 0, 0, 0.87)',
    borderRadius: 4,
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
    backgroundColor: '#ffffff',
  },
}));

interface PaperProps<Tag extends AnyTag> {
  component: Tag;
  className?: string;
}

function Paper<Tag extends AnyTag>(
  props: React.PropsWithChildren<PaperProps<Tag>> & PropsOf<Tag>
): JSX.Element;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Paper(props: any) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { component: Component, className, ...other } = props;
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
