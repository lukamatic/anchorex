class CalendarUtil {
  private countDaysInMonth(year: number, month: number): number {
    const nextMonth = month + 1;
    return new Date(year, nextMonth, 0).getDate(); // using zero index day on next month we get last day in month
  }

  public generateYears(startYear: number, endYear: number): number[] {
    const years = [];
    for (let i = startYear; i <= endYear; i++) {
      years.push(i);
    }
    return years;
  }

  public generateDaysInMonth(year: number, month: number): number[] {
    const days = [];
    const daysInMonth = this.countDaysInMonth(year, month);
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    return days;
  }

  public generateDatesInMonth(year: number, month: number): Date[] {
    const dates = [];
    const daysInMonth = this.countDaysInMonth(year, month);
    for (let day = 1; day <= daysInMonth; day++) {
      dates.push(new Date(year, month, day));
    }
    return dates;
  }

  public generateWeeksInMonth(year: number, month: number): Date[][] {
    const weeks: Date[][] = [[], [], [], [], [], []];

    let currentWeek = 0;

    this.generateDatesInMonth(year, month).forEach((date) => {
      const day = date.getDay() === 0 ? 6 : date.getDay() - 1; // make sunday 6 instead of 0, monday 0 instead of 1, etc
      weeks[currentWeek][day] = date;

      if (day === 6) {
        currentWeek++;
      }
    });

    const nonEmptyDaysInFirstWeek = weeks[0].filter((date) => {
      return Object.keys(date).length === 0;
    }).length;

    if (nonEmptyDaysInFirstWeek < 7) {
      // if there is space for dates from previous month
      const emptyDaysInFirstWeek = 7 - nonEmptyDaysInFirstWeek - 1;

      const previousMonthYear = month === 0 ? year - 1 : year;
      const previousMonth = month === 0 ? 11 : month - 1;
      const previousMonthDates = this.generateDatesInMonth(
        previousMonth,
        previousMonthYear
      ).reverse();

      for (let i = 0; i <= emptyDaysInFirstWeek; i++) {
        weeks[0][emptyDaysInFirstWeek - i] = previousMonthDates[i];
      }
    }

    const nextMonthYear = month === 11 ? year + 1 : year;
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextMonthDates = this.generateDatesInMonth(nextMonth, nextMonthYear);

    const nonEmptyDaysInFifthWeek = weeks[4].filter((date) => {
      return Object.keys(date).length === 0;
    }).length;

    if (nonEmptyDaysInFifthWeek < 7) {
      // if there is space for dates from next month
      const emptyDaysInFifthtWeek = 7 - nonEmptyDaysInFifthWeek - 1;

      for (let i = 0; i <= emptyDaysInFifthtWeek; i++) {
        weeks[4][nonEmptyDaysInFifthWeek + i] = nextMonthDates[0];
        nextMonthDates.shift();
      }
    }

    const nonEmptyDaysInSixthWeek = weeks[5].filter((date) => {
      return Object.keys(date).length === 0;
    }).length;

    const emptyDaysInSixthWeek = 7 - nonEmptyDaysInSixthWeek - 1;

    for (let i = 0; i <= emptyDaysInSixthWeek; i++) {
      weeks[5][nonEmptyDaysInSixthWeek + i] = nextMonthDates[i];
    }

    return weeks;
  }
}

export const calendarUtil = new CalendarUtil();
