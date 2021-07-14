export function dayBefore(date: Date): Date {
  const yesterday = new Date(date.getTime());
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday;
}

export interface DateNumber {
  value: number;
  current: boolean;
}

export function getWeekDates(date: Date): DateNumber[][] {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDayDate = new Date(year, month);
  const firstDay = firstDayDate.getDay();
  const lastDayN = dayBefore(new Date(year, month + 1)).getDate();

  const weeks: DateNumber[][] = [];
  let notDoneWeek = true;
  let weekN = 0;
  let n = 0;

  while (notDoneWeek) {
    if (weekN > 6) {
      throw new Error('Too many weeks');
    }
    const week: DateNumber[] = [];
    if (weekN === 0 && firstDay > 0) {
      const previousMonthLastDayDate = (new Date(year, month, -1)).getDate();
      const firstDayOfWeekN = previousMonthLastDayDate - firstDay + 2;
      for (let i = 0; i < firstDay; i += 1) {
        week.push({
          value: firstDayOfWeekN + i,
          current: false,
        });
      }
      for (let i = 0; i < (7 - firstDay); i += 1) {
        n += 1;
        week.push({
          value: n,
          current: true,
        });
      }
    } else {
      let current = true;
      for (let index = 0; index < 7; index += 1) {
        n += 1;
        week.push({
          value: n,
          current,
        });
        if (n === lastDayN) {
          notDoneWeek = false;
          n = 0;
          current = false;
        }
      }
    }
    weeks.push(week);
    weekN += 1;
  }

  return weeks;
}

export default {
  dayBefore,
  getWeekDates,
};
