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
        initialData={{ rangeFrom: 0, rangeTo: 9, problems: 10 }}
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

  const fieldRegExp = new Map<string, RegExp>([
    ['rangeFrom', /from/i],
    ['rangeTo', /^to/i],
    ['problems', /problems/i],
  ]);

  const fillOutField = (field: string, value: number): void => {
    const labelRegexp = fieldRegExp.get(field);
    if (labelRegexp === undefined) {
      throw Error(`Unknown field "${field}".`);
    }
    const found = screen.getByLabelText(labelRegexp);
    if (found instanceof HTMLInputElement) {
      userEvent.clear(found);
      userEvent.type(found, value.toString());
    }
  };

  const fillOutFields = (data: { [field: string]: number }): void => {
    Object.entries(data).forEach(([field, value]) => {
      fillOutField(field, value);
    });
  };

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
      fillOutFields({
        rangeFrom: 1,
        rangeTo: 100,
        problems: 20,
      });
    });

    it('sends calendar data to onChange callback', () => {
      expect(onChange).toHaveBeenCalledWith({
        rangeFrom: 1,
        rangeTo: 100,
        problems: 20,
      });
    });

    it('should not show any errors', () => {
      const element = screen.queryByText(/from.* must be less than .*to/i);
      expect(element).not.toBeInTheDocument();
    });
  });

  describe('when range is not valid', () => {
    beforeEach(() => {
      fillOutFields({
        rangeFrom: 5,
        rangeTo: 2,
      });
    });

    it('shows error message', () => {
      const element = screen.getByText(/from.* must be less than .*to/i);
      expect(element).toBeInTheDocument();
    });

    describe('when the field is corrected', () => {
      beforeEach(() => {
        fillOutField('rangeTo', 7);
      });

      it('removes error message', () => {
        const element = screen.queryByText(/from.* must be less than .*to/i);
        expect(element).not.toBeInTheDocument();
      });
    });
  });
});
