import CalendarEvent from '../../model/calendar-event';

export default class EventFilter {
  public getEventsInYear = (
    events: CalendarEvent[],
    year: number
  ): CalendarEvent[] => {
    const eventsInYear: CalendarEvent[] = [];

    events.map((event) => {
      if (event.date.getFullYear() === year) {
        eventsInYear.push(event);
      }
    });

    return eventsInYear;
  };

  public getEventsInMonth = (
    events: CalendarEvent[],
    month: number
  ): CalendarEvent[] => {
    const eventsInMonth: CalendarEvent[] = [];

    events.map((event) => {
      if (event.date.getMonth() === month) {
        eventsInMonth.push(event);
      }
    });

    return eventsInMonth;
  };

  public getEventsForDate = (
    events: CalendarEvent[],
    date: Date
  ): CalendarEvent[] => {
    const eventsForDate: CalendarEvent[] = [];

    events.forEach((event) => {
      if (
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth()
      ) {
        eventsForDate.push(event);
      }
    });

    return eventsForDate;
  };
}
