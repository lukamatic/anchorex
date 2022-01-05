import { CalendarMode } from '../../model/calendar-mode.enum';
import { calendarUtil } from '../../utils/calendar/calendar-util';
import { months } from '../../utils/calendar/months';

const CalendarMenu = (props: {
  year: number;
  month: number;
  day: number;
  onModeChangeHandler: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onYearChangeHandler: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onMonthChangeHandler: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onDayChangeHandler: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  const years = calendarUtil.generateYears(2022, 2030);
  const days = calendarUtil.generateDaysInMonth(props.year, props.month);

  return (
    <div className='flex flex-col border-b-2 md:border-l-2 flex-wrap items-start text-lg px-8 py-8 shadow-lg w-full md:w-auto'>
      {/* Mode selection */}
      <div className='flex items-center py-1'>
        <p className='mt-1 w-20 whitespace-nowrap'>Mode:</p>
        <select className='input bg-white' onChange={props.onModeChangeHandler}>
          <option value={CalendarMode.WEEKLY}>Weekly</option>
          <option value={CalendarMode.MONTHLY}>Monthly</option>
          <option value={CalendarMode.YEARLY}>Yearly</option>
        </select>
      </div>

      {/* Year selection */}
      <div className='flex items-center py-1'>
        <p className='my-1 w-20 whitespace-nowrap'>Year:</p>
        <select className='input bg-white' onChange={props.onYearChangeHandler}>
          {years.map((year) => (
            <option value={year} key={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Month selection */}
      <div className='flex items-center py-1'>
        <p className='my-1 w-20 whitespace-nowrap'>Month:</p>
        <select
          className='input bg-white'
          onChange={props.onMonthChangeHandler}
          value={props.month}
        >
          {months.map((month, index) => (
            <option value={index} key={index}>
              {month}
            </option>
          ))}
        </select>
      </div>

      {/* Day selection */}
      <div className='flex items-center py-1'>
        <p className='my-1 w-20 whitespace-nowrap'>Day:</p>
        <select
          className='input bg-white'
          onChange={props.onDayChangeHandler}
          value={props.day}
        >
          {days.map((day) => (
            <option value={day} key={day}>
              {day}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CalendarMenu;
