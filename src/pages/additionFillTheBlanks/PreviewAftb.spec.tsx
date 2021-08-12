import React from 'react';
import { render } from '@testing-library/react';
import PreviewAftb from './PreviewAftb';
import AftbData from './AftbData';

describe('PreviewAftb', () => {
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
      return render(
        <PreviewAftb
          aftbData={aftbData}
        />,
      );
    });

    it('should display some addition sentences', () => {
      const found = document.querySelector('.problems');
      expect(found).toHaveTextContent(/\d \+ \d = _/);
    });

    it('should have generated answer keys', () => {
      const found = document.querySelector('.answers');
      expect(found).toHaveTextContent(/\d \+ \d = \d+/);
    });
  });

  describe('when the strategy is set to "addends"', () => {
    beforeEach(() => {
      const aftbData: AftbData = {
        ...defaultAftbData,
        blankStrategy: 'addends',
      };

      return render(
        <PreviewAftb
          aftbData={aftbData}
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

      return render(
        <PreviewAftb
          aftbData={aftbData}
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
