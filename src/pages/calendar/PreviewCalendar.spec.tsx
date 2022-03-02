import React from 'react';
import { render, screen, within } from '@testing-library/react';

import PreviewCalendar from './PreviewCalendar';
import CalendarData from './CalendarData';

interface TestData {
  month: string,
  dates: number[][],
}

describe('PreviewCalendar', () => {
  function getDates(): number[][] {
    expect(screen.queryAllByRole('rowgroup', { name: 'Dates' })).toHaveLength(1);
    const calendarBody = within(screen.getByRole('rowgroup', { name: 'Dates' }));
    const dates = calendarBody.queryAllByRole('row').map((row) => (
      within(row).queryAllByRole('cell').map((cell) => Number.parseInt(cell.textContent as string, 10))
    ));
    return dates;
  }

  describe('default', () => {
    let calendarData: CalendarData;

    beforeEach(() => {
      calendarData = {
        year: 2022,
        month: 6,
        lastLoadedDay: {
          year: 2022,
          month: 6,
          date: 1,
        },
      };
      render(<PreviewCalendar calendarData={calendarData} />);
    });

    it('shows month and year', () => {
      expect(screen.getByText('July 2022')).toBeInTheDocument();
    });

    it('shows the days of the week', () => {
      const headers = screen.queryAllByRole('columnheader');
      const headerNames = headers.map((header) => header.textContent);
      expect(headerNames).toHaveLength(7);
      expect(headerNames).toEqual([
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
        'Friday', 'Saturday',
      ]);
    });

    it('shows the correct date of the first day of the week', () => {
      const dates = getDates();
      expect(dates[0][0]).toEqual(26);
    });

    it('shows the correct dates', () => {
      const dates = getDates();
      expect(dates).toEqual([
        [26, 27, 28, 29, 30, 1, 2],
        [3, 4, 5, 6, 7, 8, 9],
        [10, 11, 12, 13, 14, 15, 16],
        [17, 18, 19, 20, 21, 22, 23],
        [24, 25, 26, 27, 28, 29, 30],
        [31, 1, 2, 3, 4, 5, 6],
      ]);
    });

    it('shows correct date for first week', () => {
      const dates = getDates();
      expect(dates[0]).toEqual([26, 27, 28, 29, 30, 1, 2]);
    });
  });

  const testDatas: TestData[] = [
    {
      month: 'February 2020',
      dates: [
        [26, 27, 28, 29, 30, 31, 1],
        [2, 3, 4, 5, 6, 7, 8],
        [9, 10, 11, 12, 13, 14, 15],
        [16, 17, 18, 19, 20, 21, 22],
        [23, 24, 25, 26, 27, 28, 29],
      ],
    },
    {
      month: 'August 2021',
      dates: [
        [1, 2, 3, 4, 5, 6, 7],
        [8, 9, 10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19, 20, 21],
        [22, 23, 24, 25, 26, 27, 28],
        [29, 30, 31, 1, 2, 3, 4],
      ],
    },
  ];

  // eslint-disable-next-line no-restricted-syntax
  for (const testData of testDatas) {
    describe(`With dates for ${testData.month}`, () => {
      beforeEach(() => {
        const date = new Date(Date.parse(testData.month));
        const theCalendarData = {
          year: date.getFullYear(),
          month: date.getMonth(),
          lastLoadedDay: {
            year: date.getFullYear(),
            month: date.getMonth(),
            date: 1,
          },
        };
        render(<PreviewCalendar calendarData={theCalendarData} />);
      });

      it('shows the correct dates for each week', () => {
        const dates = getDates();
        expect(dates).toEqual(testData.dates);
      });
    });
  }
});
