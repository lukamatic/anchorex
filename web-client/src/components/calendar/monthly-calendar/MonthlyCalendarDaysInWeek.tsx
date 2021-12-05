import { days } from '../../../utils/calendar/days';

const MonthlyCalendarDaysInWeek = () => {
  return (
    <div className='flex flex-row border-b-2 border-gray-300'>
      {days.map((day, index) => {
        return (
          <div
            key={index}
            className={
              'flex flex-row items-center flex-1 h-8 ' +
              (index === 6 ? '' : 'border-r border-gray-300')
            }
          >
            <p className='text-center w-full md:hidden'>
              {day.substring(0, 1)}
            </p>
            <p className='text-center w-full hidden md:block'>{day}</p>
          </div>
        );
      })}
    </div>
  );
};

export default MonthlyCalendarDaysInWeek;
