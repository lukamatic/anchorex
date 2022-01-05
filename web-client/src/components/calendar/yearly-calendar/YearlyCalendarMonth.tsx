import CalendarEvent from '../../../model/calendar-event';
import { calendarUtil } from '../../../utils/calendar/calendar-util';
import { months } from '../../../utils/calendar/months';
import YearlyCalendarDatesInWeek from './YearlyCalendarDatesInWeek';
import YearlyCalendarDaysInWeek from './YearlyCalendarDaysInWeek';

const YearlyCalendarMonth = (props: {
  year: number;
  month: number;
  events: CalendarEvent[];
}) => {
  const weeks = calendarUtil.generateWeeksInMonth(props.year, props.month);

  return (
    <div className='w-80 bg-white mt-4 mx-2 border-2 border-blue-500 rounded-lg'>
      <div className='text-center p-2 font-bold bg-blue-500 text-white rounded-t'>
        {months[props.month]}
      </div>
      <YearlyCalendarDaysInWeek />
      <div>
        {weeks.map((week, index) => {
          return (
            <YearlyCalendarDatesInWeek
              key={index}
              month={props.month}
              week={week}
              weekIndex={index}
              events={props.events}
            />
          );
        })}
      </div>
    </div>
  );
};

export default YearlyCalendarMonth;
