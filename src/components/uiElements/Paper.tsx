import classNames from 'classnames';
import React from 'react';
import styleIt from '../styleIt';
import ComponetablePaperProps from './ComponetableProps';


const styles = styleIt(() => ({
  paper: {
    color: 'rgba(0, 0, 0, 0.87)',
    borderRadius: 4,
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
    backgroundColor: '#ffffff',
  },
}));

function Paper<Tag extends keyof JSX.IntrinsicElements = 'div'>(
  { component: Component = 'div', className, ...other }: ComponetablePaperProps<Tag>,
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

export default Paper;
