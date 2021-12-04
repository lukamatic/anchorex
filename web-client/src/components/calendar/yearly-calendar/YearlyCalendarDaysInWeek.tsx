const YearlyCalendarDaysInWeek = () => {
  const daysInWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className='flex flex-row border-b-2 border-gray-300'>
      {daysInWeek.map((day, index) => {
        return (
          <div
            key={index}
            className={
              'flex flex-row items-center flex-1 h-8 ' +
              (index === 6 ? '' : 'border-r border-gray-300')
            }
          >
            <p className='text-center  w-full'>{day}</p>
          </div>
        );
      })}
    </div>
  );
};

export default YearlyCalendarDaysInWeek;
