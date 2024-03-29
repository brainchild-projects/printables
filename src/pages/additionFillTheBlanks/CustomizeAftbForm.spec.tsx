/* eslint-disable testing-library/no-render-in-setup */
import React, { useState } from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import CustomizeAftbForm, { CustomizeAftbFormProps } from './CustomizeAftbForm';
import AftbData from './AftbData';
import stubPrint from '../../testing/stubPrint';
import manualSelect from '../../testing/manualSelect';

type FormWrapperProps = CustomizeAftbFormProps;

// This is for making sure that data changes are "persisted"
function FormWrapper({ data: initialData, onChange }: FormWrapperProps): JSX.Element {
  const [data, setData] = useState<AftbData>(initialData);

  return (
    <CustomizeAftbForm
      onChange={(updated) => {
        setData(updated);
        onChange(updated);
      }}
      data={data}
    />
  );
}

describe('CustomizeAftbForm', () => {
  stubPrint();

  let onChange: (data: AftbData) => void;
  const initialData: AftbData = {
    rangeFrom: 0,
    rangeTo: 9,
    problems: 10,
    blankStrategy: 'sum',
    problemGeneration: 'single range',
    customAddendsA: { from: 0, to: 9 },
    customAddendsB: { from: 0, to: 9 },
    fontSize: 20,
    columns: 2,
  };

  beforeEach(() => {
    onChange = vi.fn();
    render(
      <FormWrapper
        onChange={onChange}
        data={initialData}
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

  type ElementCallback = () => HTMLElement;
  const fieldRegExp = new Map<string, RegExp | ElementCallback>([
    ['rangeFrom', /from/i],
    ['rangeTo', /^to/i],
    ['problems', /problems/i],
    ['customAddendsAFrom', () => screen.getByTestId('custom-addends-a-slider-from')],
    ['customAddendsATo', () => screen.getByTestId('custom-addends-a-slider-to')],
    ['customAddendsBFrom', () => screen.getByTestId('custom-addends-b-slider-from')],
    ['customAddendsBTo', () => screen.getByTestId('custom-addends-b-slider-to')],
  ]);

  const fillOutInputField = (field: string, value: number): void => {
    const labelRegexp = fieldRegExp.get(field);
    if (labelRegexp === undefined) {
      throw Error(`Unknown field "${field}".`);
    }
    const found = labelRegexp instanceof RegExp
      ? screen.getByLabelText(labelRegexp)
      : labelRegexp() as HTMLInputElement;
    if (found instanceof HTMLInputElement) {
      ReactTestUtils.Simulate.change(
        found,
        { target: { value: value.toString() } as unknown as EventTarget },
      );
    } else {
      throw Error(`Unable to find ${field}`);
    }
  };

  const fillOutFields = (data: { [field: string]: number }): void => {
    Object.entries(data).forEach(([field, value]) => {
      fillOutInputField(field, value);
    });
  };

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
        ...initialData,
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

  describe('when the problem generation is set to custom addends', () => {
    beforeEach(async () => {
      const field = screen.getByLabelText(/problem generation/i);
      await manualSelect(field as HTMLSelectElement, 'Custom Addends');
    });

    it('hides number range slider', () => {
      const slider = screen.queryAllByLabelText(/number range/i);
      expect(slider.length).toEqual(0);
    });

    it('shows custom addends sliders', () => {
      const sliderA = screen.queryAllByLabelText(/addend a/i);
      expect(sliderA.length).toBeGreaterThan(0);
      const sliderB = screen.queryAllByLabelText(/addend b/i);
      expect(sliderB.length).toBeGreaterThan(0);
    });

    describe('when the custom addends range are changed', () => {
      beforeEach(() => {
        fillOutFields({
          customAddendsAFrom: 3,
          customAddendsATo: 4,
          customAddendsBFrom: 5,
          customAddendsBTo: 6,
        });
      });

      it('sends new aftb data to callback', () => {
        expect(onChange).toHaveBeenCalledWith({
          ...initialData,
          problemGeneration: 'custom addends',
          customAddendsA: { from: 3, to: 4 },
          customAddendsB: { from: 5, to: 6 },
        });
      });
    });
  });
});
