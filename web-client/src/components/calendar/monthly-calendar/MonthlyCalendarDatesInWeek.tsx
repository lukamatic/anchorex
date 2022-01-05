import CalendarEvent from '../../../model/calendar-event';
import EventFilter from '../../../utils/calendar/event-filter';
import MonthlyEventButton from './MonthlyEventButton';
import MonthlyEventDotsButton from './MonthlyEventDotsButton';

const MonthlyCalendarDatesInWeek = (props: {
  week: Date[];
  index: number;
  events: CalendarEvent[];
}) => {
  const eventFilter = new EventFilter();
  const renderEvents = (date: Date) => {
    const eventsForDate = eventFilter.getEventsForDate(props.events, date);

    if (eventsForDate.length > 3) {
      return (
        <div>
          {eventsForDate.slice(0, 2).map((event) => {
            return <MonthlyEventButton event={event} />;
          })}
          <MonthlyEventDotsButton />
        </div>
      );
    } else {
      return (
        <div>
          {eventsForDate.map((event) => {
            return <MonthlyEventButton event={event} />;
          })}
        </div>
      );
    }
  };

  return (
    <div
      key={props.index}
      className={
        'flex flex-row flex-1 ' + (props.index !== 5 ? 'border-b' : '')
      }
    >
      {props.week.map((date, index) => {
        return (
          <div
            key={date.getDate()}
            className={
              'flex flex-col flex-1 ' + (index === 6 ? '' : 'border-r')
            }
          >
            <p className='text-right w-full pr-2 pt-1'>{date.getDate()}</p>
            {renderEvents(date)}
          </div>
        );
      })}
    </div>
  );
};

export default MonthlyCalendarDatesInWeek;
