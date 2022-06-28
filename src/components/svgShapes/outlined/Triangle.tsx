import React from 'react';
import SvgOutlinedShapes from './SvgOutlinedShapes';

interface TriangleProps {
  width: number
}

function Triangle({ width }: TriangleProps): JSX.Element {
  return (
    <SvgOutlinedShapes width={width} title="triangle">
      <path
        d="M 375.24469,127.08427 24.755314,127.08426 200,-176.44843 Z"
        transform="translate(-8.9070679e-7,222.44843)"
      />
    </SvgOutlinedShapes>
  );
}

export default Triangle;
