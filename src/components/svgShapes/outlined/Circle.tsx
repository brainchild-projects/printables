import React from 'react';
import SvgOutlinedShapes from './SvgOutlinedShapes';

interface CircleProps {
  width: number;
}

function Circle({ width }: CircleProps): JSX.Element {
  return (
    <SvgOutlinedShapes width={width} title="circle">
      <circle
        cx={200}
        cy={200}
        r={160}
      />
    </SvgOutlinedShapes>
  );
}

export default Circle;
