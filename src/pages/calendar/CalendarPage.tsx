import React, { useEffect } from 'react';
import CustomizeCalendarForm from './CustomizeCalendarForm';
import CalendarData from './CalendarData';
import PreviewCalendar from './PreviewCalendar';
import PrintableUI from '../../components/PrintableUI';
import usePageState from '../usePageState';

const dataKey = 'calendar';
function CalendarPage(): JSX.Element {
  const now = new Date();
  const nowLast = {
    year: now.getFullYear(),
    month: now.getMonth(),
    date: now.getDate(),
  };
  const { data, onChange } = usePageState<CalendarData>({
    key: dataKey,
    defaultData: {
      year: nowLast.year,
      month: nowLast.month,
      lastLoadedDay: nowLast,
    },
  });

  const { date, month, year } = data.lastLoadedDay;
  useEffect(() => {
    if (
      date !== nowLast.date
      || month !== nowLast.month
      || year !== nowLast.year
    ) {
      onChange({
        ...data,
        year: nowLast.year,
        month: nowLast.month,
        lastLoadedDay: nowLast,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nowLast.date, nowLast.year, date, month, year]);

  return (
    <PrintableUI
      optionsKey="calendar"
      title="Calendar"
      defaultOrientation="landscape"
      customizeForm={(
        <CustomizeCalendarForm
          now={now}
          onChange={onChange}
          data={data}
        />
      )}
    >
      <PreviewCalendar calendarData={data} />
    </PrintableUI>
  );
}

export default CalendarPage;
