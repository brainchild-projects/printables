import React, { useState } from 'react';
import SimpleArithmetic from '../../components/math/ArithmeticSentence';

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
      <SimpleArithmetic latex={str} />
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
