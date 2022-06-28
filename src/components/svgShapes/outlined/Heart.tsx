import React from 'react';
import SvgOutlinedShapes from './SvgOutlinedShapes';

interface HeartProps {
  width: number
}

function Heart({ width }: HeartProps): JSX.Element {
  return (
    <SvgOutlinedShapes width={width} title="heart">
      <path
        d="m 199.71738,344.83435 0.5648,0.7122 C 354.20854,283.40829 413.52061,139.36302 345.73726,77.225488 277.94734,15.087228 200.28218,99.812398 200.28218,99.812398 h -0.5648 c 0,0 -77.671,-84.72517 -145.45508,-22.58691 -67.782617,62.130232 -8.470547,205.471322 145.45508,267.608862 z"
        transform="translate(0,12)"
      />
    </SvgOutlinedShapes>
  );
}

export default Heart;
