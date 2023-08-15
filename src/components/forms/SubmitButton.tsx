import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import React from 'react';
import styleIt from '../styleIt';

const styles = styleIt(() => ({
  submit: {
    margin: [16, 0, 16],
  },
}));

interface SubmitButtonProps {
  className?: string | undefined;
  disabled?: boolean;
  value: string;
  name: string;
  children?: React.ReactNode;
  id?: string | undefined;
}

function SubmitButton({
  className, disabled = false, value, name, children, id,
}: SubmitButtonProps): JSX.Element {
  const classes = styles();
  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      size="large"
      className={classNames(classes.submit, className)}
      disabled={disabled}
      value={value}
      name={name}
      id={id}
    >
      {children}
    </Button>
  );
}

SubmitButton.defaultProps = {
  className: undefined,
  disabled: false,
  children: undefined,
  id: undefined,
};

export default SubmitButton;
