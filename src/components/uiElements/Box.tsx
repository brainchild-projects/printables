import React, { PropsWithChildren } from 'react';

interface BoxProps {
  className?: string;
}

function Box({ children, className }: PropsWithChildren<BoxProps>): JSX.Element {
  return <div className={className}>{ children }</div>;
}

Box.defaultProps = {
  className: undefined,
};

export default Box;
