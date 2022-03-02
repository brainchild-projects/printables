export default interface CalendarData {
  month: number;
  year: number;
  lastLoadedDay: {
    month: number;
    year: number;
    date: number;
  };
}
