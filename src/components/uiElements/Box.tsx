import React, { ComponentPropsWithRef } from 'react';
import AnyTag from './AnyTag';

type BoxProps<Tag extends AnyTag> = {
  component?: Tag;
} & ComponentPropsWithRef<Tag>;

function Box<Tag extends AnyTag = 'div'>(
  { component: Component = 'div' as Tag, ...other }: BoxProps<Tag>,
): JSX.Element {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...other} />;
}

Box.defaultProps = {
  component: 'div',
};

export default Box;
