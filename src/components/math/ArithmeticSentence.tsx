import React from 'react';
import { MathJaxContext, MathJax } from 'better-react-mathjax';

interface SimpleArithmeticProps {
  latex: string;
  block?: boolean;
}

function SimpleArithmetic({ latex, block = false }: SimpleArithmeticProps): JSX.Element {
  const config = {
    loader: {
      load: ['a11y/semantic-enrich'],
    },
    'HTML-CSS': {
      scale: 200,
    },
  };
  return (
    <MathJaxContext config={config}>
      <MathJax dynamic inline={!block}>{latex}</MathJax>
    </MathJaxContext>
  );
}

SimpleArithmetic.defaultProps = {
  block: false,
};

export default SimpleArithmetic;
