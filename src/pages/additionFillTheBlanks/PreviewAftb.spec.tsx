import React from 'react';
import { render } from '@testing-library/react';
import PreviewAftb from './PreviewAftb';
import AftbData from './AftbData';
import { IntegerGenerator } from '../../lib/NumberGenerator';
import { defaultGenerator } from '../../lib/RandomNumberGenerator';

describe('PreviewAftb', () => {
  let generator: IntegerGenerator;
  const defaultAftbData: AftbData = {
    rangeFrom: 1,
    rangeTo: 20,
    problems: 20,
    blankStrategy: 'sum',
    problemGeneration: 'single range',
    customAddendsA: { from: 0, to: 9 },
    customAddendsB: { from: 0, to: 9 },
  };

  describe('default behavior', () => {
    beforeEach(() => {
      const aftbData: AftbData = { ...defaultAftbData };

      let start = 0;
      generator = {
        integer: jest.fn((max): number => {
          if (start > max) {
            start = 0;
          }
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

  describe('when the strategy is set to "addends"', () => {
    beforeEach(() => {
      const aftbData: AftbData = {
        ...defaultAftbData,
        blankStrategy: 'addends',
      };

      let start = 0;
      generator = {
        integer: jest.fn((max: number): number => {
          if (start > max) {
            start = 0;
          }
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

    it('should put blanks on addends', () => {
      const found = document.querySelector('.problems');
      expect(found).toHaveTextContent(/_\s+\+\s+\d+\s+=\s+\d+/);
      expect(found).toHaveTextContent(/\d+\s+\+\s+_+\s+=\s+\d+/);
    });

    it('should not put blanks on sum', () => {
      const found = document.querySelector('.problems');
      expect(found).not.toHaveTextContent(/\d+\s+\+\s+\d+\s+=\s+_+/);
    });
  });

  describe('when the strategy is set to "random"', () => {
    beforeEach(() => {
      const aftbData: AftbData = {
        ...defaultAftbData,
        blankStrategy: 'random',
      };

      let start = 0;
      generator = {
        integer: jest.fn((max: number): number => {
          if (start > max) {
            start = 0;
          }
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

    it('should put blanks on any position', () => {
      const found = document.querySelector('.problems');
      expect(found).toHaveTextContent(/_\s+\+\s+\d+\s+=\s+\d+/);
      expect(found).toHaveTextContent(/\d+\s+\+\s+_+\s+=\s+\d+/);
      expect(found).toHaveTextContent(/\d+\s+\+\s+\d+\s+=\s+_+/);
    });
  });

  describe('when the problem generation is set to "custom addends', () => {
    beforeEach(() => {
      const aftbData: AftbData = {
        ...defaultAftbData,
        problemGeneration: 'custom addends',
        customAddendsA: { from: 2, to: 4 },
        customAddendsB: { from: 5, to: 6 },
      };

      return render(
        <PreviewAftb
          aftbData={aftbData}
          numberGenerator={defaultGenerator}
        />,
      );
    });

    it('should display have items that use the range', () => {
      const found = document.querySelectorAll('.problems > li');
      found.forEach((element) => {
        expect(element).toHaveTextContent(/[234] \+ [56] = _|[56] \+ [234] = _/);
      });
    });
  });
});
