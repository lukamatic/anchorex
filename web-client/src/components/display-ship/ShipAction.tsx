import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import { LocalStorageItem } from '../../utils/local-storage/local-storage-item.enum';
import DatePicker from '../common/DatePicker';

const ShipAction = () => {
  const params: { id: string } = useParams();

  const [ownerId, setOwnerId] = useState(0);
  const [checkCaptain, setCheckCaptain] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [maxPersonNumber, setMaxPersonNumber] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [personNumber, setPersonNumber] = useState(0);
  const [price, setPrice] = useState(0);
  const [captain, setCaptain] = useState(false);
  const [regularService, setRegularService] = useState({
    id: 0,
    info: '',
    price: 0,
    type: '',
  });
  const [services, setServices] = useState([
    {
      id: 0,
      info: '',
      price: 0,
      type: '',
    },
  ]);

  const [regularServices, setRegularServices] = useState([
    { id: 0, info: '', price: 0, type: '' },
  ]);
  const [additionalServices, setAdditionalServices] = useState([
    { id: 0, type: '', info: '', price: 0 },
  ]);

  useEffect(() => {
    axios
      .get('/api/auth/email', {
        params: {
          email: localStorage.getItem(LocalStorageItem.EMAIL),
        },
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
          Authorization:
            'Bearer ' + localStorage.getItem(LocalStorageItem.ACCESS_TOKEN),
        },
      })
      .then((response) => {
        console.log(response.data.id);
        setOwnerId(response.data.id);
      });

    axios
      .get('/api/ship/' + params.id, {
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
          Authorization:
            'Bearer ' + localStorage.getItem(LocalStorageItem.ACCESS_TOKEN),
        },
      })
      .then((response) => {
        console.log(response.data);
        var capacity = response.data.capacity;
        setMaxPersonNumber(capacity);
        setPersonNumber(capacity);
        setLodgeServices(response.data.services);
        setServices([]);
      });
  }, []);

  const setLodgeServices = (
    services: [{ id: number; info: string; price: number; type: string }]
  ) => {
    var newRegularServices = [];
    var newAdditionalServices = [];
    for (let i = 0; i < services.length; i++) {
      if (services[i].type === 'REGULAR') {
        newRegularServices.push(services[i]);
      } else {
        newAdditionalServices.push(services[i]);
      }
    }
    console.log(newRegularServices[newRegularServices.length - 1]);
    setRegularService(newRegularServices[newRegularServices.length - 1]);

    setRegularServices(newRegularServices);
    setAdditionalServices(newAdditionalServices);
  };

  const additionalServiceChangeHandler = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    var ids = Array.from(e.target.selectedOptions, (option) => option.value);
    var newAdditionalServices = [];
    for (let i = 0; i < ids.length; i++) {
      for (let j = 0; j < additionalServices.length; j++) {
        if (additionalServices[j].id === Number(ids[i])) {
          newAdditionalServices.push(additionalServices[j]);
        }
      }
    }
    console.log(newAdditionalServices);
    setServices(newAdditionalServices);
  };

  const regularServiceChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    var info = event.target.value;
    setRegularService({
      id: 0,
      info: '',
      price: 0,
      type: '',
    });
    for (let i = 0; i < regularServices.length; i++) {
      if (regularServices[i].info === info) {
        setRegularService(regularServices[i]);
        break;
      }
    }
  };
  const discountChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setDiscount(Number(value));
  };

  const personNumberChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setPersonNumber(Number(value));
  };

  const captainChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked;
    setCaptain(Boolean(value));
  };

  const checkConditions = () => {
    if (startDate >= endDate || startDate <= new Date()) {
      window.alert('Bad dates!');
      return false;
    }
    if (personNumber === 0 || personNumber > maxPersonNumber) {
      window.alert('Person number is not valid!');
      return false;
    }
    if (discount > 100) {
      window.alert('Discount is not valid!');
      return false;
    }
    return true;
  };

  const checkCaptainAvailability = (dateRange: {
    startDate: Date;
    endDate: Date;
    ownerId: number;
  }) => {
    console.log(dateRange);

    axios
      .post('/api/reservation/checkCaptainAvailability', dateRange, {
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
          Authorization:
            'Bearer ' + localStorage.getItem(LocalStorageItem.ACCESS_TOKEN),
        },
      })
      .then((response) => {
        setCheckCaptain(response.data);
        if (!response.data) {
          setCaptain(false);
        }
        console.log(response.data);
      });
  };

  const calculatePrice = () => {
    var days = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
    var price = 0;
    console.log(regularService);
    services.push(regularService);
    for (let i = 0; i < services.length; i++) {
      price += services[i].price * days * personNumber;
    }
    if (captain) {
      price += 20;
    }
    price = price * (1 - discount / 100);
    return price;
  };

  const createReservation = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (checkConditions()) {
      var maxPersonNumber = personNumber;
      const reservation = {
        startDate,
        endDate,
        maxPersonNumber,
        discount,
        price: calculatePrice(),
        services,
        reservationEntityId: params.id,
        captain,
      };
      console.log(reservation);
      axios
        .post('/api/reservation/createReservation', reservation, {
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
            Authorization:
              'Bearer ' + localStorage.getItem(LocalStorageItem.ACCESS_TOKEN),
          },
        })
        .then((response) => {
          if (response.status === HttpStatusCode.CREATED) {
            window.alert('Action successfully created!');
            window.location.reload();
          } else {
            window.alert('There are no free periods for this action!');
          }
        })
        .catch((error) => {
          window.alert('There are no free periods for this action!');
        });
    }
  };

  return (
    <div>
      <div>
        <nav className='flex flex-col bg-blue-500 w-64 float-left h-screen px-4 tex-gray-900 border border-blue-900'>
          <div className='mt-10 mb-4'>
            <ul className='ml-4'>
              <Link to={'/ship/' + params.id}>
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

              <Link to={'/shipImages/' + params.id}>
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
              <Link to={'/shipAction/' + params.id}>
                <li className='mb-2 px-4 py-4 text-black-100 bg-gray-300 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded'>
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
              <Link to={'/shipPricelist/' + params.id}>
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

              <Link to={'/shipRules/' + params.id}>
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
              
              <Link to={'/shipKit/' + params.id}>
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

                  <span className='ml-2'>Ship kit</span>
                </li>
              </Link>
              <Link to={'/shipCalendar/' + params.id}>
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
                  <span className='ml-2'>Calendar</span>
                </li>
              </Link>
            </ul>
          </div>
        </nav>
      </div>
      <div className='w-full mt-12 mx-auto max-w-xl'>
        <div className='md:flex md:items-center mb-6'>
          <div className='md:w-1/3'>
            <label className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'>
              Action start date
            </label>
          </div>
          <div className='md:w-2/3'>
            <DatePicker
              value={startDate}
              onValueChange={function (d: Date): void {
                setStartDate(d);
                var startDate = d;
                var dateRange = {
                  startDate,
                  endDate,
                  ownerId,
                };
                checkCaptainAvailability(dateRange);
              }}
            ></DatePicker>
          </div>
        </div>
        <div className='md:flex md:items-center mb-6'>
          <div className='md:w-1/3'>
            <label className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'>
              Action end date
            </label>
          </div>
          <div className='md:w-2/3'>
            <DatePicker
              value={endDate}
              onValueChange={function (d: Date): void {
                setEndDate(d);
                var endDate = d;
                var dateRange = {
                  startDate,
                  endDate,
                  ownerId,
                };
                checkCaptainAvailability(dateRange);
              }}
            ></DatePicker>
          </div>
        </div>

        <div className='md:flex md:items-center mb-6'>
          <div className='md:w-1/3'>
            <label className='block text-gray-500 font-bold md:text-right ml-24 mb-1 md:mb-0 pr-4'>
              Max person number
            </label>
          </div>
          <div className='md:w-2/3'>
            <input
              className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500'
              id='inline-full-name'
              type='number'
              min='1'
              step='1'
              max={maxPersonNumber}
              value={personNumber}
              name='personNumber'
              onChange={personNumberChangeHandler}
            ></input>
          </div>
        </div>
        <div className='md:flex md:items-center mb-6'>
          <div className='md:w-1/3'>
            <label className='block text-gray-500 font-bold md:text-right ml-24 mb-1 md:mb-0 pr-4'>
              Regular service
            </label>
          </div>
          <div className='inline-block relative md:w-2/3'>
            <select
              onChange={regularServiceChangeHandler}
              className='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
            >
              {regularServices.map((newService) => (
                <option key={newService.id} value={newService.info} selected>
                  {newService.info}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className='md:flex md:items-center mb-6'>
          <div className='md:w-1/3'>
            <label className='block text-gray-500 font-bold md:text-right ml-24 mb-1 md:mb-0 pr-4'>
              Additional services
            </label>
          </div>
          <div className='inline-block relative md:w-2/3'>
            <select
              multiple
              onChange={(e) => additionalServiceChangeHandler(e)}
              className='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
            >
              {additionalServices.map((newService) => (
                <option key={newService.id} value={newService.id}>
                  {newService.info}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='md:flex md:items-center mb-6'>
          <div className='md:w-1/3'>
            <label className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'>
              Discount
            </label>
          </div>
          <div className='md:w-2/3'>
            <input
              className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500'
              id='inline-full-name'
              type='number'
              min='0'
              max='100'
              name='discount'
              value={discount}
              onChange={discountChangeHandler}
            ></input>
          </div>
        </div>

        <div className='md:flex md:items-center mb-6'>
          <div className='md:w-1/3'>
            <label className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'>
              Captain
            </label>
          </div>
          <div className='md:w-2/3'>
            {!checkCaptain ? (
              <input
                disabled
                id='inline-full-name'
                type='checkbox'
                name='captain'
                checked={captain}
              ></input>
            ) : (
              <input
                id='inline-full-name'
                type='checkbox'
                name='captain'
                checked={captain}
                onChange={captainChangeHandler}
              ></input>
            )}
          </div>
        </div>
        {!checkCaptain ? (
          <div className='md:flex md:items-center ml-48 mb-6'>
            <label className='block text-red-500 font-medium md:text-right mb-1 md:mb-0 pr-4'>
              *you can't choose the captain at the moment
            </label>
          </div>
        ) : (
          <div className='md:flex md:items-center ml-48 mb-6'>
            <label className='block text-gray-500 font-medium md:text-right mb-1 md:mb-0 pr-4'>
              *captain included is 20$ extra
            </label>
          </div>
        )}
      
        <button className='btnBlueWhite w-72 ml-60' onClick={createReservation}>
          Add quick reservation
        </button>
      </div>
    </div>
  );
};

export default ShipAction;
