import React, { ReactNode } from 'react';
import SvgWrap from '../SvgWrap';
import './SvgOutlinedShapes.css';

interface SvgOutlinedShapesProps {
  width?: number;
  title: string;
  children: ReactNode;
}

function SvgOutlinedShapes({ width = 40, children, title }: SvgOutlinedShapesProps) {
  return (
    <SvgWrap
      width={width}
      height={width}
      vbHeight={400}
      vbWidth={400}
    >
      <title>{title}</title>
      <g className="svgOutlineWrapper">
        {children}
      </g>
    </SvgWrap>
  );
}

SvgOutlinedShapes.defaultProps = {
  width: 40,
};

export default SvgOutlinedShapes;
