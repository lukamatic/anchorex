import { useState } from 'react';
import { CalendarMode } from '../../model/calendar-mode.enum';
import CalendarMenu from './CalendarMenu';
import MonthlyCalendar from './monthly-calendar/MonthlyCalendar';
import WeeklyCalendar from './WeeklyCalendar';
import YearlyCalendar from './yearly-calendar/YearlyCalendar';

const Calendar = () => {
  const [mode, setMode] = useState(CalendarMode.MONTHLY);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [day, setDay] = useState(new Date().getDate());

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
    <div className='flex flex-col md:flex-row flex-grow'>
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
          <MonthlyCalendar year={year} month={month} />
        )}
        {mode === CalendarMode.YEARLY && <YearlyCalendar year={year} />}
      </div>
    </div>
  );
};

export default Calendar;
