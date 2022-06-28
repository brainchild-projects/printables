import React, { ReactNode } from 'react';
import SvgWrap from './SvgWrap';

interface SvgSquareWrapProps {
  width: number | string;
  vbWidth?: number;
  children: ReactNode;
}

function SvgSquareWrap({
  width, vbWidth, children,
}: SvgSquareWrapProps): JSX.Element {
  return (
    <SvgWrap
      width={width}
      height={width}
      vbWidth={vbWidth}
      vbHeight={vbWidth}
    >
      {children}
    </SvgWrap>
  );
}

SvgSquareWrap.defaultProps = {
  vbWidth: 100,
};

export default SvgSquareWrap;
