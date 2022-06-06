import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { HttpStatusCode } from '../utils/http-status-code.enum';
import localStorageUtil from '../utils/local-storage/local-storage-util';

const LoyaltyProgramSettings = () => {
  const history = useHistory();
  const [loyaltyProgram, setLoyaltyProgram] = useState<any>();
  const reservationPointsInputRef = useRef<HTMLInputElement>(null);
  const silverBorderInputRef = useRef<HTMLInputElement>(null);
  const silverDiscountInputRef = useRef<HTMLInputElement>(null);
  const goldBorderInputRef = useRef<HTMLInputElement>(null);
  const goldDiscountInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchLoyaltyProgram = async () => {
      const response = await fetch('/api/loyaltyProgram', {
        headers: [
          ['Authorization', 'Bearer ' + localStorageUtil.getAccessToken()],
        ],
      });

      switch (response.status) {
        case HttpStatusCode.OK:
          const lp = await response.json();
          setLoyaltyProgram(lp);
          reservationPointsInputRef.current!.value = lp.reservationPoints;
          silverBorderInputRef.current!.value = lp.silverBorder;
          silverDiscountInputRef.current!.value = lp.silverDiscount;
          goldBorderInputRef.current!.value = lp.goldBorder;
          goldDiscountInputRef.current!.value = lp.goldDiscount;
          break;
        case HttpStatusCode.UNAUTHORIZED:
          history.push('/login');
          break;
        default:
          alert('Unknown error occurred.');
      }
    };

    fetchLoyaltyProgram();
  }, []);

  const reservationPointsChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    reservationPointsInputRef.current!.value = event.target.value;
    const lp = loyaltyProgram;
    lp.reservationPoints = event.target.value;
    setLoyaltyProgram(lp);
  };

  const silverBorderChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    silverBorderInputRef.current!.value = event.target.value;
    const lp = loyaltyProgram;
    lp.silverBorder = event.target.value;
    setLoyaltyProgram(lp);
  };

  const silverDiscountChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    silverDiscountInputRef.current!.value = event.target.value;
    const lp = loyaltyProgram;
    lp.silverDiscount = event.target.value;
    setLoyaltyProgram(lp);
  };

  const goldBorderChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    goldBorderInputRef.current!.value = event.target.value;
    const lp = loyaltyProgram;
    lp.goldBorder = event.target.value;
    setLoyaltyProgram(lp);
  };

  const goldDiscountChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    goldDiscountInputRef.current!.value = event.target.value;
    const lp = loyaltyProgram;
    lp.goldDiscount = event.target.value;
    setLoyaltyProgram(lp);
  };

  const submitChanges = async () => {
    const response = await fetch('/api/loyaltyProgram', {
      method: 'PUT',
      headers: [
        ['Authorization', 'Bearer ' + localStorageUtil.getAccessToken()],
        ['Content-type', 'application/json'],
      ],
      body: JSON.stringify(loyaltyProgram),
    });

    switch (response.status) {
      case HttpStatusCode.OK:
        alert('Loyalty program updated.');
        history.push('/');
        break;
      default:
        alert('Unknown error occurred.');
    }
  };

  return (
    <div className='flex flex-col items-center'>
      <div className='flex flex-col items-center w-500px mt-20'>
        <div className='flex items-center'>
          <div className='w-52'>Reservation points:</div>
          <input
            className='input ml-4'
            onChange={reservationPointsChangeHandler}
            ref={reservationPointsInputRef}
          />
        </div>
        <div className='flex items-center mt-8'>
          <div className='w-52'>Points required for bronze:</div>
          <input className='input ml-4' value='0' disabled />
        </div>
        <div className='flex items-center mt-3'>
          <div className='w-52'>Bronze discount:</div>
          <input className='input ml-4' value='0' disabled />
        </div>
        <div className='flex items-center mt-8'>
          <div className='w-52'>Points required for silver:</div>
          <input
            className='input ml-4'
            onChange={silverBorderChangeHandler}
            ref={silverBorderInputRef}
          />
        </div>
        <div className='flex items-center mt-3'>
          <div className='w-52'>Silver discount:</div>
          <input
            className='input ml-4'
            onChange={silverDiscountChangeHandler}
            ref={silverDiscountInputRef}
          />
        </div>
        <div className='flex items-center mt-8'>
          <div className='w-52'>Points required for gold:</div>
          <input
            className='input ml-4'
            onChange={goldBorderChangeHandler}
            ref={goldBorderInputRef}
          />
        </div>
        <div className='flex items-center mt-3'>
          <div className='w-52'>Gold discount:</div>
          <input
            className='input ml-4'
            onChange={goldDiscountChangeHandler}
            ref={goldDiscountInputRef}
          />
        </div>
        <button
          className='btnBlueWhite text-base w-40 mt-10'
          onClick={submitChanges}
        >
          Submit changes
        </button>
      </div>
    </div>
  );
};

export default LoyaltyProgramSettings;
