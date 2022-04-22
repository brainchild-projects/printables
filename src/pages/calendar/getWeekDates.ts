import dayBefore from './dayBefore';

export interface DateNumber {
  value: number;
  current: boolean;
}

interface GatherFirstIncompleteWeekProps {
  year: number;
  month: number;
  n: number; // day number
  firstDay: number;
}

function gatherFirstIncompleteWeek({
  year, month, n, firstDay,
}: GatherFirstIncompleteWeekProps) {
  const previousMonthLastDayDate = (new Date(year, month, -1)).getDate();
  const firstDayOfWeekN = previousMonthLastDayDate - firstDay + 2;
  const week: DateNumber[] = [];
  let m = n;

  for (let i = 0; i < firstDay; i += 1) {
    week.push({
      value: firstDayOfWeekN + i,
      current: false,
    });
  }
  for (let i = 0; i < (7 - firstDay); i += 1) {
    m += 1;
    week.push({
      value: m,
      current: true,
    });
  }

  return week;
}
interface GatherWeekNormalStartProps {
  n: number; // day number
  lastDayN: number;
}

function gatherWeekNormalStart({
  n, lastDayN,
}: GatherWeekNormalStartProps) {
  let current = true;
  const week: DateNumber[] = [];
  let m = n;
  for (let index = 0; index < 7; index += 1) {
    m += 1;
    week.push({
      value: m,
      current,
    });
    if (m === lastDayN) {
      m = 0;
      current = false;
    }
  }
  return week;
}

export default function getWeekDates(date: Date): DateNumber[][] {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDayDate = new Date(year, month);
  const firstDay = firstDayDate.getDay();
  const lastDayN = dayBefore(new Date(year, month + 1)).getDate();

  const weeks: DateNumber[][] = [];
  let notDone = true;
  let n = 0;

  while (notDone) {
    if (weeks.length > 6) {
      throw new Error(`Too many weeks: ${weeks.length}`);
    }
    let week: DateNumber[] = [];
    if (weeks.length === 0 && firstDay > 0) {
      week = gatherFirstIncompleteWeek({
        year, month, n, firstDay,
      });
      n = week[week.length - 1]?.value || 0;
    } else {
      week = gatherWeekNormalStart({ n, lastDayN });
      const lastN = week[week.length - 1]?.value || 0;
      if (lastN === lastDayN || lastN < n) {
        notDone = false;
      }
      n = lastN;
    }
    weeks.push(week);
  }

  return weeks;
}
