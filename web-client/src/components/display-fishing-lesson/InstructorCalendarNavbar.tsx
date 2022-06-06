import { Link } from 'react-router-dom';

const InstructorCalendarNavbar = (props: { entityId: string | null }) => {
  return (
    <div>
      <nav className='flex flex-col bg-blue-500 w-64 float-left h-screen px-4 tex-gray-900 border border-blue-900'>
        <div className='mt-10 mb-4'>
          <ul className='ml-4'>
            <Link to={'/fishingLesson/' + props.entityId}>
              <li className='mb-2 px-4 py-4 text-gray-100 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded'>
                <span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='#FFFFFF'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path d='M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9' />
                    <path d='M9 22V12h6v10M2 10.6L12 2l10 8.6' />
                  </svg>
                </span>

                <span className='ml-2'>Home</span>
              </li>
            </Link>

            <Link to={'/fishingLessonImages/' + props.entityId}>
              <li className='mb-2 px-4 py-4 text-gray-100 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded'>
                <span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='#FFFFFF'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <rect x='3' y='3' width='18' height='18' rx='2' />
                    <circle cx='8.5' cy='8.5' r='1.5' />
                    <path d='M20.4 14.5L16 10 4 20' />
                  </svg>
                </span>
                <span className='ml-2'>Images</span>
              </li>
            </Link>
            <Link to={'/fishingLessonAction/' + props.entityId}>
              <li className='mb-2 px-4 py-4 text-gray-100 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded'>
                <span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='#FFFFFF'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <rect
                      x='3'
                      y='4'
                      width='18'
                      height='18'
                      rx='2'
                      ry='2'
                    ></rect>
                    <line x1='16' y1='2' x2='16' y2='6'></line>
                    <line x1='8' y1='2' x2='8' y2='6'></line>
                    <line x1='3' y1='10' x2='21' y2='10'></line>
                  </svg>
                </span>
                <span className='ml-2'>Quick reservation</span>
              </li>
            </Link>
            <Link to={'/fishingLessonPricelist/' + props.entityId}>
              <li className='mb-2 px-4 py-4 text-gray-100 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded'>
                <span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='#FFFFFF'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <line x1='12' y1='1' x2='12' y2='23'></line>
                    <path d='M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'></path>
                  </svg>
                </span>
                <span className='ml-2'>Pricelist</span>
              </li>
            </Link>

            <Link to={'/fishingLessonRules/' + props.entityId}>
              <li className='mb-2 px-4 py-4 text-gray-100 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded'>
                <span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='#FFFFFF'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <circle cx='12' cy='12' r='10'></circle>
                    <line x1='12' y1='8' x2='12' y2='12'></line>
                    <line x1='12' y1='16' x2='12.01' y2='16'></line>
                  </svg>
                </span>
                <span className='ml-2'>Conduct rules</span>
              </li>
            </Link>
            <Link to={'/fishingLessonKit/' + props.entityId}>
              <li className='mb-2 px-4 py-4 text-gray-100 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded'>
                <svg
                  version='1.0'
                  id='Layer_1'
                  xmlns='http://www.w3.org/2000/svg'
                  xmlnsXlink='http://www.w3.org/1999/xlink'
                  x='0px'
                  y='0px'
                  fill='#FFFFFF'
                  width='24px'
                  height='24px'
                  viewBox='0 0 100 100'
                  enableBackground='new 0 0 100 100'
                  xmlSpace='preserve'
                >
                  <path
                    d='M60,10.001c-7.363,0-13.333,5.97-13.333,13.333c0,6.204,4.258,11.373,10,12.861v35.471c0,6.445-5.225,11.666-11.667,11.666
c-6.445,0-11.667-5.221-11.667-11.666v-3.334H40L26.667,48.334v23.332c0,10.13,8.209,18.333,18.333,18.333
s18.333-8.203,18.333-18.333V36.195c5.739-1.488,10-6.657,10-12.861C73.333,15.971,67.363,10.001,60,10.001z M60,30
c-3.682,0-6.667-2.984-6.667-6.666s2.985-6.667,6.667-6.667s6.667,2.985,6.667,6.667S63.682,30,60,30z'
                  />
                </svg>

                <span className='ml-2'>Fishing kit</span>
              </li>
            </Link>
            <Link
              to={
                '/instructorCalendar?instructorId=' +
                props.entityId +
                '&entityId=' +
                props.entityId
              }
            >
              <li className='mb-2 px-4 py-4 text-black-100 bg-gray-300 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded-lg'>
                <span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='#FFFFFF'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <rect
                      x='3'
                      y='4'
                      width='18'
                      height='18'
                      rx='2'
                      ry='2'
                    ></rect>
                    <line x1='16' y1='2' x2='16' y2='6'></line>
                    <line x1='8' y1='2' x2='8' y2='6'></line>
                    <line x1='3' y1='10' x2='21' y2='10'></line>
                  </svg>
                </span>
                <span className='ml-2'>Calendar</span>
              </li>
            </Link>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default InstructorCalendarNavbar;
