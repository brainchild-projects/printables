import React from 'react';
import { render, screen } from '@testing-library/react';
import PreviewAftb from './PreviewAftb';
import AftbData from './AftbData';
import NumberGenerator from '../../lib/NumberGenerator';
import RandomNumberGenerator from '../../lib/RandomNumberGenerator';

describe('PreviewAftb', () => {
  let generator: NumberGenerator;
  beforeEach(() => {
    const aftbData: AftbData = {
      rangeFrom: 2,
      rangeTo: 3,
      problems: 20,
    };

    generator = new RandomNumberGenerator(Math.random);

    return render(
      <PreviewAftb
        aftbData={aftbData}
        numberGenerator={generator}
      />,
    );
  });

  it('should display some addition sentences', () => {
    const found = screen.queryAllByText(/[^\d]?2 \+ 3 =/);
    expect(found.length).toBeGreaterThan(0);
  });
});
