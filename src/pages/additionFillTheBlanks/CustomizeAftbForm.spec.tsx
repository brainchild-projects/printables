import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CustomizeAftbForm from './CustomizeAftbForm';
import AftbData from './AftbData';
import stubPrint from '../../testing/stubPrint';

describe('CustomizeAftbForm', () => {
  stubPrint();

  let onBeforePrint: (data: AftbData) => boolean;
  let onChange: (data: AftbData) => void;
  beforeEach(() => {
    onBeforePrint = jest.fn(() => true);
    onChange = jest.fn();
    return render(
      <CustomizeAftbForm
        onBeforePrint={onBeforePrint}
        onChange={onChange}
      />,
    );
  });

  const defaults = new Map<RegExp, number>([
    [/from/i, 0],
    [/^to/i, 9],
    [/problems/i, 10],
  ]);

  defaults.forEach((value, labelRegexp) => {
    it(`shows default value of ${labelRegexp.toString()} field`, () => {
      const field = screen.getByLabelText(labelRegexp);
      expect(field).toHaveValue(value);
    });
  });

  it('sends calendar data to onBeforePrint callback', () => {
    userEvent.click(screen.getByRole('button', { name: /print/i }));
    expect(onBeforePrint).toHaveBeenCalledWith({
      rangeFrom: 0,
      rangeTo: 9,
      problems: 10,
    });
  });

  describe('when values are changed', () => {
    beforeEach(() => {
      const newValues = new Map<RegExp, number>([
        [/from/i, 1],
        [/^to/i, 100],
        [/problems/i, 20],
      ]);

      newValues.forEach((value, labelRegexp) => {
        const found = screen.getByLabelText(labelRegexp);
        if (found instanceof HTMLInputElement) {
          userEvent.clear(found);
          userEvent.type(found, value.toString());
        }
      });
    });

    it('sends calendar data to onChange callback', () => {
      expect(onChange).toHaveBeenCalledWith({
        rangeFrom: 1,
        rangeTo: 100,
        problems: 20,
      });
    });
  });
});
