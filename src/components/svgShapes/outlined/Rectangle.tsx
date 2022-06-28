import React from 'react';
import SvgOutlinedShapes from './SvgOutlinedShapes';

interface RectangleProps {
  width: number
}

function Rectangle({ width }: RectangleProps): JSX.Element {
  return (
    <SvgOutlinedShapes width={width} title="rectangle">
      <rect
        width={350}
        height={200}
        x={25}
        y={100}
      />
    </SvgOutlinedShapes>
  );
}

export default Rectangle;
