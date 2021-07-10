import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CustomizeCalendarForm from './CustomizeCalendarForm';

function randomInt(minIn: number, maxIn: number): number {
  const min = Math.floor(minIn);
  const max = Math.floor(maxIn);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

interface CalendarData {
  month: number;
  year: number;
}

describe('CustomizeCalendarForm', () => {
  describe('defaults', () => {
    let year: number;
    let month: number;
    let onPrint: (data: CalendarData) => void;
    let onChange: (data: CalendarData) => void;

    beforeEach(() => {
      year = randomInt(2000, 2030);
      month = randomInt(0, 11);
      const now = new Date(year, month);
      onPrint = jest.fn();
      onChange = jest.fn();
      return render(
        <CustomizeCalendarForm
          now={now}
          onPrint={onPrint}
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

    it('sends calendar data to callback', () => {
      userEvent.click(screen.getByRole('button', { name: /print/i }));
      expect(onPrint).toHaveBeenCalledWith({ year, month });
    });

    describe('when the values are changed', () => {
      beforeEach(() => {
        userEvent.selectOptions(screen.getByLabelText('Year'), '2020');
        userEvent.selectOptions(screen.getByLabelText('Month'), 'February');
      });

      it('sends calendar data to onChange callback', () => {
        expect(onChange).toHaveBeenCalledWith({ year: 2020, month: 1 });
      });

      it('sends calendar data to callback', () => {
        userEvent.click(screen.getByRole('button', { name: /print/i }));
        expect(onPrint).toHaveBeenCalledWith({ year: 2020, month: 1 });
      });
    });
  });
});
