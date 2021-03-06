import axios from 'axios';
// @ts-ignore
import Calendar from 'react-awesome-calendar';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import { LocalStorageItem } from '../../utils/local-storage/local-storage-item.enum';
import DatePicker from '../common/DatePicker';
import ReportModal from '../ReportModal';
import { CalendarEventColors } from '../../utils/calendar-event-colors.enum';
import localStorageUtil from '../../utils/local-storage/local-storage-util';
import PersonalReservationModal from '../PersonalReservationModal';

const ShipCalendar = () => {
  const params: { id: string } = useParams();
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [ownerId, setOwnerId] = useState(0);
  const [checkCaptain, setCheckCaptain] = useState(false);
  const [captain, setCaptain] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [maxPersonNumber, setMaxPersonNumber] = useState(0);
  const [personNumber, setPersonNumber] = useState(0);
  const [regularService, setRegularService] = useState({
    id: 0,
    info: '',
    price: 0,
    type: '',
  });
  const [regularServices, setRegularServices] = useState([
    { id: 0, info: '', price: 0, type: '' },
  ]);
  const [additionalServices, setAdditionalServices] = useState([
    { id: 0, type: '', info: '', price: 0 },
  ]);
  const [userId, setUserID] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [services, setServices] = useState([
    {
      id: 0,
      info: '',
      price: 0,
      type: '',
    },
  ]);
  const [reservations, setReservations] = useState([
    {
      startDate,
      endDate,
      maxPersonNumber,
      price: 0,
      discount,
      services,
      userId: userId,
      userFullname: String,
    },
  ]);
  const [calendarEvents, setCalendarEvents] = useState<any[]>([]);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    axios
      .get('/api/reservation/bookedReservations/' + params.id, {
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
          Authorization:
            'Bearer ' + localStorage.getItem(LocalStorageItem.ACCESS_TOKEN),
        },
      })
      .then((response) => {
        setReservations(response.data);
      });
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
  const captainChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked;
    setCaptain(Boolean(value));
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

  const startDateChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setStartDate(new Date(value));
  };

  const endDateChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEndDate(new Date(value));
  };

  const personNumberChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setPersonNumber(Number(value));
  };

  const addNewFreePeriod = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (startDate >= endDate || endDate <= new Date()) {
      window.alert('Dates were not entered properly! Change them.');
    } else {
      const freePeriod = {
        startDate,
        endDate,
      };
      axios
        .post('/api/ship/addFreePeriod/' + params.id, freePeriod, {
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
            Authorization:
              'Bearer ' + localStorage.getItem(LocalStorageItem.ACCESS_TOKEN),
          },
        })
        .then((response) => {
          window.location.reload();
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
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
        userId: userId,
      };
      console.log(reservation);
      axios
        .post('/api/reservation/createPersonalReservation', reservation, {
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

  const getReservations = reservations.map((reservation) => (
    <tr className='border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
      <td className='px-6 py-4'>{reservation.userFullname}</td>
      <td className='px-6 py-4'>
        {reservation.startDate.toString().slice(0, 10)}
      </td>
      <td className='px-6 py-4'>
        {reservation.endDate.toString().slice(0, 10)}
      </td>
      <td className='px-6 py-4'>
        {reservation.services.map((service) => {
          return service.type === 'REGULAR' ? service.info : ' ';
        })}
      </td>
      <td className='px-6 py-4'>
        {reservation.services.map((service) => {
          return service.type === 'ADDITIONAL' ? service.info + ' ' : ' ';
        })}
      </td>
      <td className='px-6 py-4'>{reservation.discount}%</td>
      <td className='px-6 py-4'>{reservation.price}$</td>
      <td className='px-6 py-4'>{reservation.maxPersonNumber}</td>
      <td className='px-6 py-4'>
        <button
          type='button'
          className='inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
          onClick={function (): void {
            console.log(reservation.startDate);
            console.log(new Date());
            if (
              new Date(reservation.startDate) <= new Date() &&
              new Date() <= new Date(reservation.endDate)
            ) {
              
              setUserID(reservation.userId);
              setShowModal(true);
            }
          }}
          data-bs-toggle='modal'
          data-bs-target='#exampleModalScrollable'
        >
          Personal reservation
        </button>
      </td>
    </tr>
  ));

  useEffect(() => {
    const fetchReservations = async () => {
      const response = await fetch(
        `/api/reservation/allReservations/${params.id}`,
        {
          headers: [
            ['Authorization', 'Bearer ' + localStorageUtil.getAccessToken()],
          ],
        }
      );

      switch (response.status) {
        case HttpStatusCode.OK:
          const reservations = await response.json();
          reservations.map((reservation: any) => {
            const event = {
              id: (reservation.userId ? 'r' : 'a') + reservation.id,
              color: reservation.userId
                ? CalendarEventColors.RESERVATION
                : CalendarEventColors.ACTION,
              from: reservation.startDate,
              to: reservation.endDate,
              title: `${reservation.userFullName || 'Action'} - ${
                reservation.reservationEntityName
              }`,
              userId: reservation.userId
            };
            calendarEvents.push(event);
          });
          break;
        default:
          alert('Unknown error occurred.');
      }

      const res = await fetch(`/api/freePeriod/` + params.id, {
        headers: [
          ['Authorization', 'Bearer ' + localStorageUtil.getAccessToken()],
        ],
      });

      switch (res.status) {
        case HttpStatusCode.OK:
          const periods = await res.json();
          periods.map((period: any) => {
            const event = {
              id: 'fp' + period.id,
              color: CalendarEventColors.FREE_PERIOD,
              from: period.startDate,
              to: period.endDate,
              title: ``,
            };
            calendarEvents.push(event);
          });
          break;
        default:
          alert('Unknown error occurred.');
      }

      setFetched(true);
    };

    fetchReservations();
  }, [params.id]);

  return (
    <div>
      {showReservationModal && (
        <PersonalReservationModal
          entityId={params.id}
          setShowModal={setShowModal}
          entity="ship"
          userId={userId}
        />
      )}
      {showReportModal && (
        <ReportModal close={() => setShowReportModal(false)} />
      )}
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
                <li className='mb-2 px-4 py-4 text-black-100 bg-gray-300 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded rounded-lg'>
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
      <div className='flex pr-10'>
        <div className='w-500px'>
          <h2 className='text-xl font-bold leading-7 text-gray-900 mb-8 sm:text-3xl sm:truncate text-center'>
            Free period
          </h2>
          <div className='flex flex-col items-center -mx-3 mb-6'>
            <div className='px-3 mb-6 md:mb-0'>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                Start Date
              </label>
              <input
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
                id='grid-first-name'
                type='date'
                onChange={startDateChangeHandler}
              />
            </div>
            <div className='px-3'>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                End Date
              </label>
              <input
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='grid-last-name'
                type='date'
                onChange={endDateChangeHandler}
              />
            </div>
            <button
              className='mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              type='button'
              onClick={addNewFreePeriod}
            >
              Add new period
            </button>
          </div>
        </div>
        {fetched && (
          <Calendar
            events={calendarEvents}
            onClickEvent={(eventId: string) => {
              const event = calendarEvents.find((e) => e.id === eventId);
              if (eventId.startsWith('r')) {
                if (
                  new Date() > new Date(event.from) &&
                  new Date() < new Date(event.to)
                ) {
                  console.log(event)
                  setUserID(event.userId)
                  setShowReservationModal(true);
                } else if (new Date() > new Date(event.to)) {
                  setShowReportModal(true);
                }
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ShipCalendar;
