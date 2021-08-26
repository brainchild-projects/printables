interface CopyrightYearParams {
  now: Date,
  startYear: number;
}
function copyrightYear({ now, startYear }: CopyrightYearParams): string {
  const yearNow = now.getFullYear();
  return yearNow > startYear
    ? `${startYear}-${yearNow}`
    : `${startYear}`;
}

export default copyrightYear;
