import React, { useEffect, useState } from 'react';
import CustomizeCalendarForm from './CustomizeCalendarForm.js';
import CalendarData from './CalendarData.js';
import PreviewCalendar from './PreviewCalendar.js';
import PrintableUI from '../../components/PrintableUI.js';
import usePageState from '../usePageState.js';

const dataKey = 'calendar';
function CalendarPage(): JSX.Element {
  const [now, setNow] = useState(() => {
    return new Date();
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setNow(new Date());
      clearTimeout(timeoutId);
    });
  }, []);

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
    // eslint-disable-next-line @eslint-react/exhaustive-deps
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
