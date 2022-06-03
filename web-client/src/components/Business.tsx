import React, { useEffect, useRef, useState } from 'react';
import { HttpStatusCode } from '../utils/http-status-code.enum';
import localStorageUtil from '../utils/local-storage/local-storage-util';

const Business = () => {
  const [businessConfiguration, setBusinessConfiguration] = useState<any>();
  const [revenue, setRevenue] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  useEffect(() => {
    const fetchBusinessConfiguration = async () => {
      const response = await fetch('/api/businessConfiguration', {
        headers: [
          ['Authorization', 'Bearer ' + localStorageUtil.getAccessToken()],
        ],
      });
      switch (response.status) {
        case HttpStatusCode.OK:
          const config = await response.json();
          setBusinessConfiguration(config);
          break;
        default:
          alert('Unknown error occurred');
      }
    };

    fetchBusinessConfiguration();
  }, []);

  const submitChanges = async () => {
    const response = await fetch('/api/businessConfiguration', {
      method: 'PUT',
      headers: [
        ['Content-type', 'Application/json'],
        ['Authorization', 'Bearer ' + localStorageUtil.getAccessToken()],
      ],
      body: JSON.stringify(businessConfiguration),
    });
    switch (response.status) {
      case HttpStatusCode.OK:
        window.location.reload();
        break;
      default:
        alert('Unknown error occurred');
    }
  };

  const onAppPercentageChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const curr = {
      ...businessConfiguration,
      appPercentage: event.target.value,
    };
    setBusinessConfiguration(curr);
  };

  const onFromChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFrom(event.target.value);
  };

  const onToChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTo(event.target.value);
  };

  const getRevenue = async () => {
    const response = await fetch(
      `/api/reservation/appRevenue?from=${from}&to=${to}`,
      {
        headers: [
          ['Content-type', 'Application/json'],
          ['Authorization', 'Bearer ' + localStorageUtil.getAccessToken()],
        ],
      }
    );
    switch (response.status) {
      case HttpStatusCode.OK:
        const revenue = await response.text();
        setRevenue(revenue);
        break;
      default:
        alert('Unknown error occurred');
    }
  };

  return (
    <div className='flex flex-col px-20'>
      {businessConfiguration && (
        <div className='flex items-center mt-5 mb-10'>
          <div>App earning percentage:</div>
          <input
            className='input mx-2'
            type='number'
            value={businessConfiguration.appPercentage}
            onChange={onAppPercentageChangeHandler}
          />
          <button className='btnWhiteBlue' onClick={submitChanges}>
            Submit changes
          </button>
        </div>
      )}
      <div className='flex items-center'>
        <div>App revenue from:</div>
        <input
          className='input mx-2'
          type='date'
          onChange={onFromChangeHandler}
        />
        <div>to:</div>
        <input
          className='input mx-2'
          type='date'
          onChange={onToChangeHandler}
        />
        <button className='btnWhiteBlue' onClick={getRevenue}>
          Calculate revenue
        </button>
      </div>
      {revenue !== '' && <div>Revenue is {revenue}</div>}
    </div>
  );
};

export default Business;
