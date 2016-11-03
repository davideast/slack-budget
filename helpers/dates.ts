/**
 * Generate a id with a format of "year_month"
 * ex: "2016_04", "2016_11"
 */
export function createYearMonthId(date: Date = new Date()): string {
  // getMonth() + 1 because of JavaScript months
  return `${date.getFullYear()}_${date.getMonth()+1}`;
}
