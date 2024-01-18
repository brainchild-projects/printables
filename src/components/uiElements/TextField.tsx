import classNames from 'classnames';
import React, { ComponentPropsWithRef } from 'react';
import styleIt from '../styleIt';

const styles = styleIt(() => ({
  textField: {
  },
}));

// declare function pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K>;
// type TextFieldTag = pick(JSX.IntrinsicElements, 'input', 'textarea', 'select');

type TextFieldTag = 'input' | 'textarea';

type TextFieldProps<Tag extends TextFieldTag> = {
  component: Tag;
  className?: string | undefined;
} & ComponentPropsWithRef<Tag>;

function ListItemIcon<Tag extends TextFieldTag>({
  component: Component,
  className,
  ...other
}: TextFieldProps<Tag>): JSX.Element {
  const classes = styles();
  return (
    <Component
      className={classNames(classes.textField, className as string)}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
    />
  );
}

ListItemIcon.defaultProps = {
  className: undefined,
};

export default ListItemIcon;
