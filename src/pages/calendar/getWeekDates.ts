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

function isIncompleteFirstWeek(weeksLength: number, firstDay: number): boolean {
  return weeksLength === 0 && firstDay > 0;
}

interface GetWeekProps {
  weeksLength: number;
  firstDay: number;
  lastDayN: number;
  year: number;
  month: number;
  n: number;
}

interface GetWeekReturn {
  week: DateNumber[];
  notDone: boolean;
  n: number;
}

function getWeek({
  weeksLength, firstDay, lastDayN,
  year, month, n,
}: GetWeekProps): GetWeekReturn {
  let week: DateNumber[] = [];
  let notDone = true;
  let m = n;
  if (isIncompleteFirstWeek(weeksLength, firstDay)) {
    week = gatherFirstIncompleteWeek({
      year, month, n, firstDay,
    });
    m = week[week.length - 1]?.value || 0;
  } else {
    week = gatherWeekNormalStart({ n, lastDayN });
    const lastN = week[week.length - 1]?.value || 0;
    if (lastN === lastDayN || lastN < n) {
      notDone = false;
    }
    m = lastN;
  }
  return { week, notDone, n: m };
}

export default function getWeekDates(date: Date): DateNumber[][] {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = (new Date(year, month)).getDay();
  const lastDayN = dayBefore(new Date(year, month + 1)).getDate();

  const weeks: DateNumber[][] = [];
  let notDone = true;
  let n = 0;

  while (notDone) {
    if (weeks.length > 6) {
      throw new Error(`Too many weeks: ${weeks.length}`);
    }
    const weekInfo = getWeek({
      weeksLength: weeks.length,
      firstDay,
      n,
      lastDayN,
      year,
      month,
    });
    notDone = weekInfo.notDone;
    n = weekInfo.n;
    weeks.push(weekInfo.week);
  }

  return weeks;
}
