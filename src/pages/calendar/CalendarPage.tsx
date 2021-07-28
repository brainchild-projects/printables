import React, {
  useState,
} from 'react';
import CustomizeCalendarForm from './CustomizeCalendarForm';
import CalendarData from './CalendarData';
import PreviewCalendar from './PreviewCalendar';
import PrintableUI from '../../components/PrintableUI';

const CalendarPage = (): JSX.Element => {
  const now = new Date();
  const [calendarData, setCalendarData] = useState(({
    year: now.getFullYear(),
    month: now.getMonth(),
  }) as CalendarData);
  const onPrint = (data: CalendarData): boolean => {
    setCalendarData({ ...data });
    return true;
  };
  const onChange = (data: CalendarData): void => {
    setCalendarData({ ...data });
  };

  return (
    <PrintableUI
      title="Calendar"
      customizeForm={(
        <CustomizeCalendarForm
          onBeforePrint={onPrint}
          onChange={onChange}
          now={now}
        />
      )}
    >
      <PreviewCalendar calendarData={calendarData} />
    </PrintableUI>
  );
};

export default CalendarPage;
