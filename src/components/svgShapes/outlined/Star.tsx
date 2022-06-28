import React from 'react';
import SvgOutlinedShapes from './SvgOutlinedShapes';

interface StarProps {
  width: number
}

function Star({ width }: StarProps): JSX.Element {
  return (
    <SvgOutlinedShapes width={width} title="star">
      <path
        d="M 200,200 90.57646,142.92332 -18.475829,200.70618 1.9935876,79.000544 -86.660187,-6.8584611 35.414147,-24.999998 89.67539,-135.84664 144.65206,-25.353092 266.84113,-8.0010789 178.74425,78.429226 Z"
        transform="matrix(0.93562164,0,0,0.93562164,115.17478,169.7213)"
      />
    </SvgOutlinedShapes>
  );
}

export default Star;
