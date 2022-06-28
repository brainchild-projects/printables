import React from 'react';
import SvgWrap from '../../components/svgShapes/SvgWrap';

interface CrossableCircleProps {
  crossed?: boolean,
  width?: number,
  crossColor?: string,
}

function CrossableCircle({
  crossed = false,
  width = 20,
  crossColor = '#333',
}: CrossableCircleProps): JSX.Element {
  const widthPercent = 70;
  const remove = Math.floor((100 - widthPercent) / 2);
  const smaller = `${remove}%`;
  const larger = `${100 - remove}%`;
  const strokeWidth = 1.5;

  const crossOrBlank = crossed
    ? (
      <>
        <line
          x1={smaller}
          y1={smaller}
          x2={larger}
          y2={larger}
          strokeLinecap="round"
          style={{ stroke: crossColor, strokeWidth }}
        />
        <line
          x1={smaller}
          y1={larger}
          x2={larger}
          y2={smaller}
          strokeLinecap="round"
          style={{ stroke: crossColor, strokeWidth }}
        />
      </>
    )
    : '';
  return (
    <SvgWrap width={width} height={width}>
      <circle
        cx="50%"
        cy="50%"
        r="40%"
        style={{ fill: '#aaa', stroke: '#999' }}
      />
      {crossOrBlank}
    </SvgWrap>
  );
}

CrossableCircle.defaultProps = {
  width: 20,
  crossed: false,
  crossColor: '#333',
};

export default CrossableCircle;
