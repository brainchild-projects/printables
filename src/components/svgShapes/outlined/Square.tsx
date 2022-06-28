import React from 'react';
import SvgOutlinedShapes from './SvgOutlinedShapes';

interface SquareProps {
  width: number
}

function Square({ width = 40 }: SquareProps): JSX.Element {
  return (
    <SvgOutlinedShapes width={width} title="square">
      <rect
        width={300}
        height={300}
        x={50}
        y={50}
      />
    </SvgOutlinedShapes>
  );
}

export default Square;
