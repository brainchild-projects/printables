import React, { useState } from 'react';
import SimpleArithmetic from '../../components/math/ArithmeticSentence';
import Circle from '../../components/svgShapes/outlined/Circle';
import Diamond from '../../components/svgShapes/outlined/Diamond';
import Heart from '../../components/svgShapes/outlined/Heart';
import Hexagon from '../../components/svgShapes/outlined/Hexagon';
import Oval from '../../components/svgShapes/outlined/Oval';
import Parallelogram from '../../components/svgShapes/outlined/Parallelogram';
import Pentagon from '../../components/svgShapes/outlined/Pentagon';
import Rectangle from '../../components/svgShapes/outlined/Rectangle';
import Square from '../../components/svgShapes/outlined/Square';
import Star from '../../components/svgShapes/outlined/Star';
import SvgWrap from '../../components/svgShapes/SvgWrap';
import Triangle from '../../components/svgShapes/outlined/Triangle';

const strMain = 'What difference does it make? \\(1 + \\underline{\\hspace{1cm}} = 129\\)';
const str1 = '\\(\\frac{10}{4x} \\approx 2^{12}\\)';
const str2 = '$$1 + 12 = 13$$';

function ExperimentsPage(): JSX.Element {
  const [str, setStr] = useState(str1);
  const onClick = () => {
    setStr(str === str1 ? str2 : str1);
  };

  return (
    <div style={{ padding: '2em' }}>
      <h1>Experiments</h1>
      <div>
        <Circle width={40} />
        <Triangle width={40} />
        <Square width={40} />
        <Rectangle width={40} />
        <Diamond width={40} />
        <Star width={40} />
        <Oval width={40} />
        <Parallelogram width={40} />
        <Hexagon width={40} />
        <Pentagon width={40} />
        <Heart width={40} />
      </div>
      <SimpleArithmetic latex={str} />

      <SvgWrap
        width={100}
        height={100}
        vbWidth={100}
        vbHeight={100}
      >
        <circle
          // cx="50%"
          // cy="50%"
          // r="40%"
          cx="52.916664"
          cy="52.916664"
          r="39.6875"
          style={{ fill: '#aaa', stroke: '#999' }}
        />
      </SvgWrap>
      <p>
        <button type="button" onClick={onClick}>Click Me</button>
      </p>
      <div style={{
        fontSize: '20px',
      }}
      >
        <p>
          It makes no difference
          {' '}
          <SimpleArithmetic latex={strMain} />
        </p>

      </div>
    </div>
  );
}

export default ExperimentsPage;
