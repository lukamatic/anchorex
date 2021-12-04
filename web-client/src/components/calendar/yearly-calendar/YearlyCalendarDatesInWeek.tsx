const YearlyCalendarDatesInWeek = (props: { week: Date[]; index: number }) => {
  return (
    <div
      key={props.index}
      className={'flex flex-row ' + (props.index !== 5 ? 'border-b' : '')}
    >
      {props.week.map((date, index) => {
        return (
          <div
            key={date.getDate()}
            className={
              'flex flex-row items-center flex-1 h-8 ' +
              (index === 6 ? '' : 'border-r')
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
