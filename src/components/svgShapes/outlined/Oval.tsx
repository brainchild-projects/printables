import React from 'react';
import SvgOutlinedShapes from './SvgOutlinedShapes';

interface OvalProps {
  width: number;
}

function Oval({ width }: OvalProps): JSX.Element {
  return (
    <SvgOutlinedShapes width={width} title="oval">
      <ellipse
        cx={200}
        cy={200}
        rx={142}
        ry={175}
      />
    </SvgOutlinedShapes>
  );
}

export default Oval;
