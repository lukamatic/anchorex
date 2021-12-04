import YearlyCalendarMonth from './YearlyCalendarMonth';

const YearlyCalendar = (props: { year: number }) => {
  return (
    <div className='flex flex-col w-full items-center mb-5 md:mb-0'>
      <div className='flex flex-col md:flex-row'>
        <YearlyCalendarMonth year={props.year} month={0} />
        <YearlyCalendarMonth year={props.year} month={1} />
        <YearlyCalendarMonth year={props.year} month={2} />
        <YearlyCalendarMonth year={props.year} month={3} />
      </div>
      <div className='flex flex-col md:flex-row'>
        <YearlyCalendarMonth year={props.year} month={4} />
        <YearlyCalendarMonth year={props.year} month={5} />
        <YearlyCalendarMonth year={props.year} month={6} />
        <YearlyCalendarMonth year={props.year} month={7} />
      </div>
      <div className='flex flex-col md:flex-row'>
        <YearlyCalendarMonth year={props.year} month={8} />
        <YearlyCalendarMonth year={props.year} month={9} />
        <YearlyCalendarMonth year={props.year} month={10} />
        <YearlyCalendarMonth year={props.year} month={11} />
      </div>
    </div>
  );
};

export default YearlyCalendar;
