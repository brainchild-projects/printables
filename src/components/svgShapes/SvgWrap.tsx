import React, { ReactNode } from 'react';

interface SvgWrapProps {
  width: number | string;
  height: number | string;
  vbWidth?: number;
  vbHeight?: number;
  children: ReactNode;
}

function SvgWrap({
  width, height, vbWidth, vbHeight, children,
}: SvgWrapProps): JSX.Element {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${vbWidth ?? 100} ${vbHeight ?? 100}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
}

SvgWrap.defaultProps = {
  vbWidth: 100,
  vbHeight: 100,
};

export default SvgWrap;
