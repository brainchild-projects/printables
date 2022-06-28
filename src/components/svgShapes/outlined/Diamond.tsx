import React from 'react';
import SvgOutlinedShapes from './SvgOutlinedShapes';

interface DiamondProps {
  width: number
}

function Diamond({ width }: DiamondProps): JSX.Element {
  return (
    <SvgOutlinedShapes width={width} title="diamond">
      <rect
        width={238.97226}
        height={238.97226}
        x={163.35658}
        y={-119.48613}
        transform="rotate(45)"
      />
    </SvgOutlinedShapes>
  );
}

export default Diamond;
