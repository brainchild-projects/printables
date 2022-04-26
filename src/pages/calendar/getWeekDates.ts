import dayBefore from './dayBefore';

export interface DateNumber {
  value: number;
  current: boolean;
}
export type Week = DateNumber[];
export type Weeks = Week[];

export function getNumberOfWeeks(nOfDays: number, firstDay: number): number {
  return Math.ceil((nOfDays + firstDay) / 7);
}

function weekNumbers(start: number, length = 7, current = true): Week {
  const week: Week = [];
  for (let n = start; week.length < length; n++) {
    week.push({ value: n, current });
  }
  return week;
}

function getFirstDateOfFirstWeek(firstDayOfMonth: number, numberOfDaysLastMonth: number): number {
  if (firstDayOfMonth === 0) {
    return 1;
  }
  return numberOfDaysLastMonth + 1 - firstDayOfMonth;
}

function lastDayOfWeek(week: Week): number {
  return week[week.length - 1]?.value ?? 0;
}

export default function getWeekDates(date: Date): Weeks {
  const year = date.getFullYear();
  const month = date.getMonth();
  const monthDateObj = new Date(year, month);
  const firstDay = (new Date(year, month)).getDay();
  const numberOfDays = dayBefore(new Date(year, month + 1)).getDate();
  const numberOfDaysLastMonth = dayBefore(monthDateObj).getDate();
  const numberOfWeeks = getNumberOfWeeks(numberOfDays, firstDay);
  const firstDateOfFirstWeek = getFirstDateOfFirstWeek(firstDay, numberOfDaysLastMonth);
  const weeks: Weeks = [];

  const firstWeek = firstDay > 0
    ? weekNumbers(
      firstDateOfFirstWeek,
      firstDay,
      false,
    ).concat(weekNumbers(1, 7 - firstDay))
    : weekNumbers(1);
  weeks.push(firstWeek);
  let lastDateN = lastDayOfWeek(firstWeek);

  for (let i = 1; weeks.length < numberOfWeeks - 1; i++) {
    const week = weekNumbers(lastDateN + 1);
    lastDateN = lastDayOfWeek(week);
    weeks.push(week);
  }

  const weekTemp = weekNumbers(lastDateN + 1, numberOfDays - lastDateN);
  const lastWeek = weekTemp.length < 7
    ? weekTemp.concat(weekNumbers(1, 7 - weekTemp.length, false))
    : weekTemp;
  weeks.push(lastWeek);

  return weeks;
}
