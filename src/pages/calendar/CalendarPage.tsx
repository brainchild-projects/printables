import React, {
  useEffect,
  useState,
} from 'react';
import CustomizeCalendarForm from './CustomizeCalendarForm';
import CalendarData from './CalendarData';
import PreviewCalendar from './PreviewCalendar';
import PrintableUI from '../../components/PrintableUI';
import LocalStore from '../../lib/LocalStore';

const CalendarPage = (): JSX.Element => {
  const now = new Date();
  const calendarDataStore = LocalStore.create<CalendarData>('calendar');
  const [calendarData, setCalendarData] = useState<CalendarData | null>(null);
  const onPrint = (data: CalendarData): boolean => {
    setCalendarData({ ...data });
    return true;
  };
  const onChange = (data: CalendarData): void => {
    calendarDataStore.set(data);
    setCalendarData({ ...data });
  };

  useEffect(() => {
    const savedData = calendarDataStore.get();
    setCalendarData(savedData || {
      year: now.getFullYear(),
      month: now.getMonth(),
    } as CalendarData);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (calendarData === null) {
    return <></>;
  }

  return (
    <PrintableUI
      optionsKey="calendar"
      title="Calendar"
      defaultOrientation="landscape"
      customizeForm={(
        <CustomizeCalendarForm
          now={now}
          onBeforePrint={onPrint}
          onChange={onChange}
          initialData={calendarData}
        />
      )}
    >
      <PreviewCalendar calendarData={calendarData} />
    </PrintableUI>
  );
};

export default CalendarPage;
