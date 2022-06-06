import axios from 'axios';
import { useEffect, useState } from 'react';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import { LocalStorageItem } from '../../utils/local-storage/local-storage-item.enum';
import DatePicker from '../common/DatePicker';

const InstructorCalendarModal = (props: {
  entityId: string | null;
  instructorId: string | null;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [ownerId, setOwnerId] = useState(0);
  const [checkCaptain, setCheckCaptain] = useState(false);
  const [captain, setCaptain] = useState(false);
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
  const [maxPersonNumber, setMaxPersonNumber] = useState(0);
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

  useEffect(() => {
    axios
      .get('/api/reservation/bookedReservations/' + props.instructorId, {
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
      .get('/api/fishingLessons/' + props.entityId, {
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

  const personNumberChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setPersonNumber(Number(value));
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
        reservationEntityId: props.entityId,
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

  return (
    <div>
      <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
        <div className='relative w-auto my-6 mx-auto max-w-3xl'>
          <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
            <div className='flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t'>
              <div className='w-full mt-12 mx-auto max-w-xl'>
                <div className='md:flex md:items-center mb-6'>
                  <div className='md:w-1/3'>
                    <label className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'>
                      Start date
                    </label>
                  </div>
                  <div className='md:w-2/3'>
                    <DatePicker
                      value={startDate}
                      onValueChange={function (d: Date): void {
                        setStartDate(d);
                      }}
                    ></DatePicker>
                  </div>
                </div>
                <div className='md:flex md:items-center mb-6'>
                  <div className='md:w-1/3'>
                    <label className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'>
                      End date
                    </label>
                  </div>
                  <div className='md:w-2/3'>
                    <DatePicker
                      value={endDate}
                      onValueChange={function (d: Date): void {
                        setEndDate(d);
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
                        <option
                          key={newService.id}
                          value={newService.info}
                          selected
                        >
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
                <button
                  className='btnRedWhite w-60 ml-30'
                  type='button'
                  onClick={() => props.setShowModal(false)}
                >
                  Close
                </button>
                <button
                  className='btnBlueWhite w-60 ml-24'
                  onClick={createReservation}
                >
                  Create reservation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
    </div>
  );
};

export default InstructorCalendarModal;
