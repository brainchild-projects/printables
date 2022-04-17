import React from 'react';

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
    <svg viewBox={`0 0 ${width} ${width}`} xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="50%"
        cy="50%"
        r="40%"
        style={{ fill: '#aaa', stroke: '#999' }}
      />
      {crossOrBlank}
    </svg>
  );
}

CrossableCircle.defaultProps = {
  width: 20,
  crossed: false,
  crossColor: '#333',
};

export default CrossableCircle;
