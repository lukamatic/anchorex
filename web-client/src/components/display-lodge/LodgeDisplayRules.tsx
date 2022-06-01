import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AuthContext from '../../context/auth-context';
import { UserRole } from '../../model/user-role.enum';
import { LocalStorageItem } from '../../utils/local-storage/local-storage-item.enum';

const LodgeDisplayRules = () => {
  const params: { id: string } = useParams();
  const [rules, setRules] = useState(['']);
  const [currentRule, setCurrentRule] = useState('');
  const [rulesOfConduct, setRulesOfConduct] = useState('');
  const [entity, setEntity] = useState({ rulesOfConduct });
  const authContext = useContext(AuthContext);
  const userRole = authContext.user.role;

  useEffect(() => {
    axios
      .get('/api/reservationEntity/lodge/' + params.id, {
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
          Authorization:
            'Bearer ' + localStorage.getItem(LocalStorageItem.ACCESS_TOKEN),
        },
      })
      .then((response) => {
        console.log('Originalna pravila' + response.data.rulesOfConduct);

        parseRules(response.data.rulesOfConduct);
        setEntity(response.data);
      });
  }, []);

  const parseRules = (originalRules: string) => {
    var parsedRules = originalRules.slice(1, originalRules.length);
    if (originalRules.includes('#')) {
      var newRules = [];
      newRules = parsedRules.split('#');
      setRules(newRules);
    } else {
      var emptyRules: [] = [];
      setRules(emptyRules);
    }
  };

  const removeRule =
    (index: number) => (event: React.MouseEvent<HTMLButtonElement>) => {
      var currentRules = [...rules];
      currentRules.splice(index, 1);
      setRules(currentRules);
    };

  const rulesChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCurrentRule(value.trim());
    console.log(currentRule);
  };

  const addNewRule = () => {
    var currentRules = [...rules];
    if (currentRule.length > 0 && !currentRules.includes(currentRule)) {
      currentRules.push(currentRule);
      setRules(currentRules);
    }
  };

  const changeEntity = () => {
    var newRules = '';
    for (let i = 0; i < rules.length; i++) {
      newRules += '#';
      newRules += rules[i];
    }
    setRulesOfConduct(newRules);
    entity.rulesOfConduct = newRules;
    axios
      .put('/api/reservationEntity/updateLodge', entity, {
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
              <Link to={'/lodge/' + params.id}>
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

              <Link to={'/lodgeImages/' + params.id}>
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
              <Link to={'/lodgeAction/' + params.id}>
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
              <Link to={'/lodgePricelist/' + params.id}>
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

              <Link to={'/lodgeRules/' + params.id}>
                <li className='mb-2 px-4 py-4 text-black-100 flex flex-row bg-gray-300 border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded'>
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
            </ul>
          </div>
        </nav>
      </div>
      <div className='min-h-screen bg-gray-100 py-6 flex flex-col sm:py-12'>
        <div className='relative py-3 sm:max-w-xl sm:mx-auto'>
          <div className='relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20 bg-clip-padding bg-opacity-60 border border-gray-200'>
            <ul className='list-disc space-y-2'>
              {rules.map((r, i) => (
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
                  {userRole === UserRole.LODGE_OWNER ? (
                    <button
                      className='btnBlueWhite w-12 h-8 ml-8'
                      onClick={removeRule(i)}
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
          {userRole === UserRole.LODGE_OWNER ? (
            <div className='flex flex-wrap items-center mb-4 mt-8'>
              <input
                className='input resize-none w-3/5 ml-12 mb-4'
                placeholder='List rule of conduct'
                name='currentRule'
                onChange={rulesChangeHandler}
              />
              <button
                className='btnBlueWhite w-24 ml-4 mb-4'
                onClick={addNewRule}
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

export default LodgeDisplayRules;
