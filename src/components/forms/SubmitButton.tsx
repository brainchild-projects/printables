import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import classNames from 'classnames';
import React from 'react';

const styles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(2, 0, 2),
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
