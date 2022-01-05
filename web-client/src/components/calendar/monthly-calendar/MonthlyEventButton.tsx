import CalendarEvent from '../../../model/calendar-event';

const MonthlyEventButton = (props: { event: CalendarEvent }) => {
  return (
    <div className='bg-blue-500 text-white mx-1 mb-1 rounded-md'>
      <button className='w-full hover:bg-blue-600 px-1 rounded-md hover:underline'>
        {props.event.data.client}
      </button>
    </div>
  );
};

export default MonthlyEventButton;
