import CalendarEvent from '../../../model/calendar-event';

const EventDateButton = (props: { date: Date; events: CalendarEvent[] }) => {
  return (
    <button
      className='text-white w-full h-full bg-blue-500 hover:bg-blue-600'
      onClick={() => console.log(props.events)}
    >
      {props.date.getDate()}
    </button>
  );
};

export default EventDateButton;
