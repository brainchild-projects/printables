import classNames from 'classnames';
import React, { ComponentPropsWithRef } from 'react';
import styleIt from '../styleIt';

const styles = styleIt(() => ({
  textInputField: {
  },
}));

type TextFieldProps = {
  className?: string | undefined;
  type: 'text' | 'number';
} & ComponentPropsWithRef<'input'>;

function TextField({
  className,
  type = 'text',
  ...other
}: TextFieldProps): JSX.Element {
  const classes = styles();
  return (
    <input
      className={classNames(classes.textInputField, className as string)}
      type={type}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
    />
  );
}

TextField.defaultProps = {
  className: undefined,
};

export default TextField;
