import classNames from 'classnames';
import React  from 'react';
import styleIt from '../styleIt';
import ComponetablePaperProps from './ComponetableProps';


const styles = styleIt(() => ({
  list: {
    padding: [8, 0],
    margin: 0,
    position: 'relative',
    listStyle: 'none',
  },
}));

function List<Tag extends keyof JSX.IntrinsicElements = 'ul'>(
  { component: Component = 'ul', className, ...other }: ComponetablePaperProps<Tag>,
): JSX.Element {
  const classes = styles();
  return (
    <Component
      className={classNames(classes.list, className as string)}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
    />
  );
}

export default List;

