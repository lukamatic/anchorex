const YearlyCalendarDatesInWeek = (props: {
  month: number;
  week: Date[];
  weekIndex: number;
}) => {
  return (
    <div
      key={props.weekIndex}
      className={'flex flex-row ' + (props.weekIndex !== 5 ? 'border-b' : '')}
    >
      {props.week.map((date, index) => {
        return (
          <div
            key={date.getDate()}
            className={
              'flex flex-row items-center flex-1 h-8' +
              (index === 6 ? '' : ' border-r') +
              (date.getMonth() === props.month ? '' : ' bg-gray-100') +
              (props.weekIndex === 5 && index === 0 ? ' rounded-bl-md' : '') +
              (props.weekIndex === 5 && index === 6 ? ' rounded-br-md' : '')
            }
          >
            <p className='text-center w-full'>{date.getDate()}</p>
          </div>
        );
      })}
    </div>
  );
};

export default YearlyCalendarDatesInWeek;
