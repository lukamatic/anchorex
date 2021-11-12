export default class CalendarUtil {
  public generateYears(startYear: number, endYear: number): number[] {
    const years = [];
    for (let i = startYear; i <= endYear; i++) {
      years.push(i);
    }
    return years;
  }

  public generateDays(year: number, month: number): number[] {
    const days = [];
    const daysInMonth = this.calculateDaysInMonth(year, month);
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  }

  private calculateDaysInMonth(year: number, month: number): number {
    const nextMonth = month + 1;
    return new Date(year, nextMonth, 0).getDate(); // using zero index day on next month we get last day in month
  }
}
