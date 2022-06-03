import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AuthContext from '../../context/auth-context';
import { UserRole } from '../../model/user-role.enum';
import { LocalStorageItem } from '../../utils/local-storage/local-storage-item.enum';

const FishingLessonDisplayKit = () => {
  const params: { id: string } = useParams();
  const [kit, setKit] = useState(['']);
  const [currentKit, setCurrentKit] = useState('');
  const [entity, setEntity] = useState({ fishingKit: '' });
  const authContext = useContext(AuthContext);
  const userRole = authContext.user.role;

  useEffect(() => {
    axios
      .get('/api/fishingLessons/' + params.id, {
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
          Authorization:
            'Bearer ' + localStorage.getItem(LocalStorageItem.ACCESS_TOKEN),
        },
      })
      .then((response) => {
        parseKit(response.data.fishingKit);
        setEntity(response.data);
      });
  }, []);

  const parseKit = (originalKit: string) => {
    var parsedKit = originalKit.slice(1, originalKit.length);
    if (originalKit.includes('#')) {
      var newKit = [];
      newKit = parsedKit.split('#');
      setKit(newKit);
    } else {
      var emptyKit: [] = [];
      setKit(emptyKit);
    }
  };

  const removeKit =
    (index: number) => (event: React.MouseEvent<HTMLButtonElement>) => {
      var currentKits = [...kit];
      currentKits.splice(index, 1);
      setKit(currentKits);
    };

  const kitsChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCurrentKit(value.trim());
    console.log(currentKit);
  };

  const addNewKit = () => {
    var currentKits = [...kit];
    if (currentKit.length > 0 && !currentKits.includes(currentKit)) {
      currentKits.push(currentKit);
      setKit(currentKits);
    }
  };

  const changeEntity = () => {
    var newKits = '';
    for (let i = 0; i < kit.length; i++) {
      newKits += '#';
      newKits += kit[i];
    }
    entity.fishingKit = newKits;

    axios
      .put('/api/fishingLessons', entity, {
        headers: {
          'Access-Control-Allow-Methods': 'PUT',
          'Access-Control-Allow-Origin': '*',
          'Content-type': 'application/json',
          Authorization:
            'Bearer ' + localStorage.getItem(LocalStorageItem.ACCESS_TOKEN),
        },
      })
      .then((response) => {
        console.log('Update-ovano!');
        window.location.reload();
      });
  };

  return (
    <div>
      <div>
        <nav className='flex flex-col bg-blue-500 w-64 float-left h-screen px-4 tex-gray-900 border border-blue-900'>
          <div className='mt-10 mb-4'>
            <ul className='ml-4'>
              <Link to={'/fishingLesson/' + params.id}>
                <li
                  className='mb-2 px-4 py-4 text-gray-100 flex flex-row border-gray-300 hover:text-black   
                hover:bg-gray-300  hover:font-bold rounded'
                >
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

              <Link to={'/fishingLessonImages/' + params.id}>
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
              <Link to={'/fishingLessonAction/' + params.id}>
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
              <Link to={'/fishingLessonPricelist/' + params.id}>
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

              <Link to={'/fishingLessonRules/' + params.id}>
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
              <Link to={'/fishingLessonKit/' + params.id}>
                <li className='mb-2 px-4 py-4 text-black-100 flex flex-row bg-gray-300 border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded'>
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

                  <span className='ml-2'>FishingLesson kit</span>
                </li>
              </Link>
            </ul>
          </div>
        </nav>
      </div>
      <div className='min-h-screen bg-gray-100 py-6 flex flex-col  sm:py-12'>
        <div className='relative py-3 sm:max-w-xl sm:mx-auto'>
          <div className='relative px-4 py-10 bg-white shadow-lg mb-12 sm:rounded-3xl sm:p-20 bg-clip-padding bg-opacity-60 border border-gray-200'>
            <h2 className='text-2xl font-bold leading-7 text-gray-900 mb-8 sm:text-3xl sm:truncate'>
              Fishing kit
            </h2>
            <ul className='list-disc space-y-2'>
              {kit.map((r, i) => (
                <li key={i} className='flex items-start'>
                  <span className='h-6 flex items-center sm:h-7'>
                    <svg
                      className='flex-shrink-0 h-5 w-5 text-cyan-500'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </span>
                  <p className='ml-2'>{r}</p>
                  {userRole === UserRole.INSTRUCTOR ? (
                    <button
                      className='btnBlueWhite w-12 h-8 ml-8'
                      onClick={removeKit(i)}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path
                          fillRule='evenodd'
                          d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </button>
                  ) : (
                    <div></div>
                  )}
                </li>
              ))}
            </ul>
          </div>
          {userRole === UserRole.INSTRUCTOR ? (
            <div className='flex flex-wrap items-center mb-4 mt-8'>
              <input
                className='input resize-none w-3/5 ml-12 mb-4'
                placeholder='List new fishing kit'
                name='currentRule'
                onChange={kitsChangeHandler}
              />
              <button
                className='btnBlueWhite w-24 ml-4 mb-4'
                onClick={addNewKit}
              >
                Add
              </button>

              <button
                className='btnBlueWhite w-72 ml-32'
                onClick={changeEntity}
              >
                Submit changes
              </button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FishingLessonDisplayKit;
