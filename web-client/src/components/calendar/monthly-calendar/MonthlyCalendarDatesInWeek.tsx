const MonthlyCalendarDatesInWeek = (props: { week: Date[]; index: number }) => {
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
          </div>
        );
      })}
    </div>
  );
};

export default MonthlyCalendarDatesInWeek;
