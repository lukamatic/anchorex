import { days } from '../../../utils/calendar/days';

const DailyCalendar = (props: { year: number; month: number; day: number }) => {
  const date = new Date(props.year, props.month, props.day);
  return (
    <div className='flex flex-col flex-grow md:m-8 border-2 border-blue-500 rounded-lg bg-white'>
      <div className='flex items-center bg-blue-500 h-12'>
        <p className='text-lg text-center text-white w-full'>
          {days[date.getDay() - 1]}
        </p>
      </div>
      <div className='h-16 border-b-2 border-gray-300'>text</div>
    </div>
  );
};

export default DailyCalendar;
