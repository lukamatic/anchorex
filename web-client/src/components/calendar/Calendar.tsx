import { useEffect, useState } from 'react';
import CalendarEvent from '../../model/calendar-event';
import { CalendarMode } from '../../model/calendar-mode.enum';
import EventFilter from '../../utils/calendar/event-filter';
import CalendarMenu from './CalendarMenu';
import MonthlyCalendar from './monthly-calendar/MonthlyCalendar';
import WeeklyCalendar from './WeeklyCalendar';
import YearlyCalendar from './yearly-calendar/YearlyCalendar';

const Calendar = () => {
  const eventFilter = new EventFilter();

  const [mode, setMode] = useState(CalendarMode.MONTHLY);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [day, setDay] = useState(new Date().getDate());
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    const event1 = new CalendarEvent(new Date(2022, 0, 10), { client: 'Pera' });
    const event2 = new CalendarEvent(new Date(2022, 0, 11), {
      client: 'Djoka',
    });
    const event3 = new CalendarEvent(new Date(2022, 1, 2), { client: 'Mira' });
    const event4 = new CalendarEvent(new Date(2022, 2, 13), {
      client: 'Djoka',
    });
    const event5 = new CalendarEvent(new Date(2022, 2, 23), {
      client: 'Djoka',
    });
    const event6 = new CalendarEvent(new Date(2022, 0, 10), {
      client: 'Tanja',
    });
    events.push(event1);
    events.push(event2);
    events.push(event3);
    events.push(event4);
    events.push(event5);
    events.push(event6);
  }, []);

  const onModeChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const modeStr = event.target.value;
    setMode(CalendarMode[modeStr as keyof typeof CalendarMode]);
  };

  const onYearChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(parseInt(event.target.value));
  };

  const onMonthChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setMonth(parseInt(event.target.value));
  };

  const onDayChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDay(parseInt(event.target.value));
  };

  return (
    <div className='flex flex-col md:flex-row flex-grow bg-blue-50'>
      <div className='flex'>
        <CalendarMenu
          year={year}
          month={month}
          day={day}
          onModeChangeHandler={onModeChangeHandler}
          onYearChangeHandler={onYearChangeHandler}
          onMonthChangeHandler={onMonthChangeHandler}
          onDayChangeHandler={onDayChangeHandler}
        />
      </div>
      <div className='flex flex-grow'>
        {mode === CalendarMode.WEEKLY && <WeeklyCalendar />}
        {mode === CalendarMode.MONTHLY && (
          <MonthlyCalendar
            year={year}
            month={month}
            events={eventFilter.getEventsInMonth(events, month)}
          />
        )}
        {mode === CalendarMode.YEARLY && (
          <YearlyCalendar
            year={year}
            events={eventFilter.getEventsInYear(events, year)}
          />
        )}
      </div>
    </div>
  );
};

export default Calendar;
