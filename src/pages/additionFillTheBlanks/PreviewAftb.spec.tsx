import React from 'react';
import { render } from '@testing-library/react';
import PreviewAftb from './PreviewAftb';
import AftbData from './AftbData';
import { IntegerGenerator } from '../../lib/NumberGenerator';

describe('PreviewAftb', () => {
  let generator: IntegerGenerator;
  beforeEach(() => {
    const aftbData: AftbData = {
      rangeFrom: 1,
      rangeTo: 20,
      problems: 20,
    };

    let start = 0;
    generator = {
      integer: jest.fn((): number => {
        const generated = start;
        start += 1;
        return generated;
      }),
    };

    return render(
      <PreviewAftb
        aftbData={aftbData}
        numberGenerator={generator}
      />,
    );
  });

  it('should call number generator', () => {
    expect(generator.integer).toHaveBeenCalledWith(20, 1);
  });

  it('should display some addition sentences', () => {
    const found = document.querySelector('.problems');
    expect(found).toHaveTextContent(/[^\d]?2 \+ 3 = _/);
  });

  it('should have generated answer keys', () => {
    const found = document.querySelector('.answers');
    expect(found).toHaveTextContent(/[^\d]?2\s+\+\s+3\s+=\s+5/);
  });
});
