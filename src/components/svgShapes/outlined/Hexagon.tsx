import React from 'react';
import SvgOutlinedShapes from './SvgOutlinedShapes';

interface HexagonProps {
  width: number
}

function Hexagon({ width }: HexagonProps): JSX.Element {
  return (
    <SvgOutlinedShapes width={width} title="hexagon">
      <path
        d="m 200,25 151.55445,87.5 -10e-6,175 L 200,375 48.445552,287.5 l 5e-6,-175 z"
      />
    </SvgOutlinedShapes>
  );
}

export default Hexagon;
