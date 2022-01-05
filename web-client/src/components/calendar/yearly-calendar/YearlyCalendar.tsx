import CalendarEvent from '../../../model/calendar-event';
import EventFilter from '../../../utils/calendar/event-filter';
import YearlyCalendarMonth from './YearlyCalendarMonth';

const YearlyCalendar = (props: { year: number; events: CalendarEvent[] }) => {
  const eventFilter = new EventFilter();

  return (
    <div className='flex flex-col w-full items-center mb-5 md:mb-0'>
      <div className='flex flex-col md:flex-row'>
        <YearlyCalendarMonth
          year={props.year}
          month={0}
          events={eventFilter.getEventsInMonth(props.events, 0)}
        />
        <YearlyCalendarMonth
          year={props.year}
          month={1}
          events={eventFilter.getEventsInMonth(props.events, 1)}
        />
        <YearlyCalendarMonth
          year={props.year}
          month={2}
          events={eventFilter.getEventsInMonth(props.events, 2)}
        />
        <YearlyCalendarMonth
          year={props.year}
          month={3}
          events={eventFilter.getEventsInMonth(props.events, 3)}
        />
      </div>
      <div className='flex flex-col md:flex-row'>
        <YearlyCalendarMonth
          year={props.year}
          month={4}
          events={eventFilter.getEventsInMonth(props.events, 4)}
        />
        <YearlyCalendarMonth
          year={props.year}
          month={5}
          events={eventFilter.getEventsInMonth(props.events, 5)}
        />
        <YearlyCalendarMonth
          year={props.year}
          month={6}
          events={eventFilter.getEventsInMonth(props.events, 6)}
        />
        <YearlyCalendarMonth
          year={props.year}
          month={7}
          events={eventFilter.getEventsInMonth(props.events, 7)}
        />
      </div>
      <div className='flex flex-col md:flex-row'>
        <YearlyCalendarMonth
          year={props.year}
          month={8}
          events={eventFilter.getEventsInMonth(props.events, 8)}
        />
        <YearlyCalendarMonth
          year={props.year}
          month={9}
          events={eventFilter.getEventsInMonth(props.events, 9)}
        />
        <YearlyCalendarMonth
          year={props.year}
          month={10}
          events={eventFilter.getEventsInMonth(props.events, 10)}
        />
        <YearlyCalendarMonth
          year={props.year}
          month={11}
          events={eventFilter.getEventsInMonth(props.events, 11)}
        />
      </div>
    </div>
  );
};

export default YearlyCalendar;
