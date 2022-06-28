import React from 'react';
import SvgOutlinedShapes from './SvgOutlinedShapes';

interface PentagonProps {
  width: number
}

function Pentagon({ width }: PentagonProps): JSX.Element {
  return (
    <SvgOutlinedShapes width={width} title="pentagon">
      <path
        d="m 200,24.020126 167.36681,121.599104 -63.92844,196.75148 -206.876748,0 -63.928426,-196.75149 z"
        transform="translate(0,12)"
      />
    </SvgOutlinedShapes>
  );
}

export default Pentagon;
