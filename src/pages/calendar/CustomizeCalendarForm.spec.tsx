import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CustomizeCalendarForm, { CustomizeCalendarFormProps } from './CustomizeCalendarForm';
import stubPrint from '../../testing/stubPrint';
import CalendarData from './CalendarData';

function randomInt(minIn: number, maxIn: number): number {
  const min = Math.floor(minIn);
  const max = Math.floor(maxIn);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

type FormWrapperProps = CustomizeCalendarFormProps;

// This is for making sure that data changes are "persisted"
function FormWrapper({ data: initialData, now, onChange }: FormWrapperProps): JSX.Element {
  const [data, setData] = useState<CalendarData>(initialData);

  return (
    <CustomizeCalendarForm
      data={data}
      now={now}
      onChange={(updated) => {
        setData(updated);
        onChange(updated);
      }}
    />
  );
}

describe('CustomizeCalendarForm', () => {
  stubPrint();

  describe('defaults', () => {
    let year: number;
    let month: number;
    let initialData: CalendarData;
    let onChange: (data: CalendarData) => void;

    beforeEach(() => {
      year = randomInt(2020, 2030);
      month = randomInt(0, 11);
      const now = new Date(year, month);
      onChange = jest.fn();
      initialData = {
        year,
        month,
        lastLoadedDay: {
          month,
          year,
          date: 1,
        },
      };
      return render(
        <FormWrapper
          data={initialData}
          now={now}
          onChange={onChange}
        />,
      );
    });

    it('shows current year', () => {
      const yearSelect = screen.getByLabelText('Year');
      expect(yearSelect).toHaveValue(year.toString());
    });

    it('shows current month', () => {
      const monthSelect = screen.getByLabelText('Month');
      expect(monthSelect).toHaveValue(month.toString());
    });

    describe('when the values are changed', () => {
      beforeEach(async () => {
        await userEvent.selectOptions(screen.getByLabelText('Year'), '2031');
        await userEvent.selectOptions(screen.getByLabelText('Month'), 'February');
      });

      it('sends calendar data to onChange callback', () => {
        expect(onChange).toHaveBeenCalledWith({ ...initialData, year: 2031, month: 1 });
      });
    });
  });
});
