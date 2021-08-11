import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
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
        initialData={{
          rangeFrom: 0, rangeTo: 9, problems: 10, blankStrategy: 'sum',
        }}
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
      // userEvent.clear(found);
      // userEvent.type(found, value.toString());
      ReactTestUtils.Simulate.change(
        found, { target: { value: value.toString() } as unknown as EventTarget },
      );
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
      blankStrategy: 'sum',
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
        blankStrategy: 'sum',
      });
    });

    it('should not show any errors', () => {
      const element = screen.queryByText(/from.* must be less than .*to/i);
      expect(element).not.toBeInTheDocument();
    });
  });
});
