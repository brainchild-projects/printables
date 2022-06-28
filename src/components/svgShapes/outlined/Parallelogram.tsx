import React from 'react';
import SvgOutlinedShapes from './SvgOutlinedShapes';

interface ParallelogramProps {
  width: number
}

function Parallelogram({ width }: ParallelogramProps): JSX.Element {
  return (
    <SvgOutlinedShapes width={width} title="parallelogram">
      <rect
        width={279.01422}
        height={213.39067}
        x={131.0421}
        y={105.38293}
        transform="matrix(1,0,-0.33265648,0.94304807,0,0)"
      />
    </SvgOutlinedShapes>
  );
}

export default Parallelogram;
