import React from 'react';
import { render, screen } from '@testing-library/react';
import AdditionSentence, { AdditionBlankPosition } from './AdditionSentence';
import Addition from './Addition';

describe('AdditionSentence', () => {
  const element = () => screen.getByRole('listitem', { name: 'Addition Problem' });

  describe('default behavior', () => {
    beforeEach(() => {
      const addition = new Addition(1, 2);
      return render(
        <AdditionSentence addition={addition} />,
      );
    });

    it('renders addition sentence', () => {
      expect(element()).toHaveTextContent(/1 \+ 2 = _/);
    });
  });

  describe('when showAnswer is true', () => {
    beforeEach(() => render(
      <AdditionSentence showAnswer addition={new Addition(3, 4)} />,
    ));

    it('renders the answer instead of blank', () => {
      expect(element()).toHaveTextContent(/3 \+ 4 = 7/);
    });
  });

  describe('blanks', () => {
    const blanks: Record<AdditionBlankPosition, RegExp> = {
      addendA: /_+ \+ 6 = 11/,
      addendB: /5 \+ _+ = 11/,
      sum: /5 \+ 6 = _+/,
    };

    Object.entries(blanks).forEach(([blank, content]) => {
      describe(`when blank=${blank}`, () => {
        beforeEach(() => render(
          <AdditionSentence
            blank={blank as AdditionBlankPosition}
            addition={new Addition(5, 6)}
          />,
        ));

        it('blanks correct position', () => {
          expect(element()).toHaveTextContent(content);
        });
      });

      describe(`when blank=${blank} but showAnswer=true`, () => {
        beforeEach(() => render(
          <AdditionSentence
            showAnswer
            blank={blank as AdditionBlankPosition}
            addition={new Addition(5, 6)}
          />,
        ));

        it('displays everything when show answer is enabled', () => {
          expect(element()).toHaveTextContent(/5 \+ 6 = 11/);
        });
      });
    });
  });
});
