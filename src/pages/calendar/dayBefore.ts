export default function dayBefore(date: Date): Date {
  const yesterday = new Date(date.getTime());
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday;
}
