import CalendarEvent from '../../../model/calendar-event';
import { calendarUtil } from '../../../utils/calendar/calendar-util';
import { months } from '../../../utils/calendar/months';
import MonthlyCalendarDatesInWeek from './MonthlyCalendarDatesInWeek';
import MonthlyCalendarDaysInWeek from './MonthlyCalendarDaysInWeek';

const MonthlyCalendar = (props: {
  year: number;
  month: number;
  events: CalendarEvent[];
}) => {
  const weeks = calendarUtil.generateWeeksInMonth(props.year, props.month);

  return (
    <div className='flex flex-col flex-grow md:m-8 border-2 border-blue-500 rounded-lg bg-white'>
      <div className='flex flex-row items-center bg-blue-500 rounded-t h-8 md:h-12'>
        <p className='text-white font-bold md:text-xl text-center w-full'>
          {months[props.month]}
        </p>
      </div>
      <MonthlyCalendarDaysInWeek />
      <div className='flex flex-col flex-grow'>
        {weeks.map((week, index) => {
          return (
            <MonthlyCalendarDatesInWeek key={index} week={week} index={index} />
          );
        })}
      </div>
    </div>
  );
};

export default MonthlyCalendar;
