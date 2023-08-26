import classNames from 'classnames';
import React, { ComponentPropsWithRef } from 'react';
import styleIt from '../styleIt';
import AnyTag from './AnyTag';

const styles = styleIt(() => ({
  list: {
    padding: [8, 0],
    margin: 0,
    position: 'relative',
    listStyle: 'none',
  },
}));

const DEFAULT_TAG = 'ul' as const;

type ListProps<Tag extends AnyTag> = {
  component: Tag;
  className?: string | undefined;
} & ComponentPropsWithRef<Tag>;

function List<Tag extends AnyTag>(
  { component: Component = DEFAULT_TAG, className, ...other }: ListProps<Tag>,
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

List.defaultProps = {
  className: undefined,
};

export default List;

