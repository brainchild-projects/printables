import React from 'react';
import { render, screen } from '@testing-library/react';
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
    fontSize: 20,
    columns: 2,
  };

  describe('default behavior', () => {
    beforeEach(async () => {
      const aftbData: AftbData = { ...defaultAftbData };
      await render(
        <PreviewAftb
          aftbData={aftbData}
        />,
      );
    });

    it('should display some addition sentences', () => {
      const found = screen.queryAllByRole('listitem', { name: 'Addition Problem' });
      expect(found).toHaveLength(20);
    });

    it('should display addition problem with correct content', () => {
      const found = screen.queryAllByRole('listitem', { name: 'Addition Problem' })[0];
      expect(found).toHaveTextContent(/\d+ \+ \d+ = _/);
    });

    it('should have generated answer keys', () => {
      const found = screen.queryAllByRole('listitem', { name: 'Addition Problem Answer' });
      expect(found).toHaveLength(20);
    });

    it('should have correct content and answer', () => {
      const firstProblem = screen.queryAllByRole('listitem', { name: 'Addition Problem' })[0];
      const match = firstProblem.textContent?.match(/(\d+) \+ (\d+) = _/);
      if (!match) {
        throw Error('first problem not found');
      }
      const a = parseFloat(match[1]);
      const b = parseFloat(match[2]);
      const firstSolution = screen.queryAllByRole('listitem', { name: 'Addition Problem Answer' })[0];
      expect(firstSolution).toHaveTextContent(`${a} + ${b} = ${a + b}`);
    });
  });

  describe('when the strategy is set to "addends"', () => {
    beforeEach(async () => {
      const aftbData: AftbData = {
        ...defaultAftbData,
        blankStrategy: 'addends',
      };

      await render(
        <PreviewAftb
          aftbData={aftbData}
        />,
      );
    });

    it('should put blanks on addends', async () => {
      const found = await screen.findByRole('list', { name: 'Problems' });
      expect(found).toHaveTextContent(/_\s+\+\s+\d+\s+=\s+\d+/);
      expect(found).toHaveTextContent(/\d+\s+\+\s+_+\s+=\s+\d+/);
    });

    it('should not put blanks on sum', async () => {
      const found = await screen.findByRole('list', { name: 'Problems' });
      expect(found).not.toHaveTextContent(/\d+\s+\+\s+\d+\s+=\s+_+/);
    });
  });

  describe('when the strategy is set to "random"', () => {
    beforeEach(async () => {
      const aftbData: AftbData = {
        ...defaultAftbData,
        blankStrategy: 'random',
      };

      await render(
        <PreviewAftb
          aftbData={aftbData}
        />,
      );
    });

    it('should put blanks on any position', async () => {
      const found = await screen.findByRole('list', { name: 'Problems' });
      expect(found).toHaveTextContent(/_\s+\+\s+\d+\s+=\s+\d+/);
      expect(found).toHaveTextContent(/\d+\s+\+\s+_+\s+=\s+\d+/);
      expect(found).toHaveTextContent(/\d+\s+\+\s+\d+\s+=\s+_+/);
    });
  });

  describe('when the problem generation is set to "custom addends', () => {
    beforeEach(async () => {
      const aftbData: AftbData = {
        ...defaultAftbData,
        problemGeneration: 'custom addends',
        customAddendsA: { from: 2, to: 4 },
        customAddendsB: { from: 5, to: 6 },
      };

      await render(
        <PreviewAftb
          aftbData={aftbData}
        />,
      );
    });

    it('should display have items that use the range', () => {
      const found = screen.queryAllByRole('listitem', { name: 'Addition Problem' });
      found.forEach((element) => {
        expect(element).toHaveTextContent(/[234] \+ [56] = _|[56] \+ [234] = _/);
      });
    });
  });
});
