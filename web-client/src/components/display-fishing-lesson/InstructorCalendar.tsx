import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import { LocalStorageItem } from '../../utils/local-storage/local-storage-item.enum';
// @ts-ignore
import Calendar from 'react-awesome-calendar';
import localStorageUtil from '../../utils/local-storage/local-storage-util';
import InstructorCalendarNavbar from './InstructorCalendarNavbar';
import InstructorCalendarModal from './InstructorCalendarModal';
import ReportModal from '../ReportModal';

enum CalendarEventColors {
  RESERVATION = '#fd3153',
  ACTION = '#eb34bd',
  FREE_PERIOD = '#34eb6b',
}

const InstructorCalendar = () => {
  console.log(window.location.search);
  const searchParams = new URLSearchParams(window.location.search);
  const params = {
    instructorId: searchParams.get('instructorId'),
    entityId: searchParams.get('entityId'),
  };

  const [showReservationModal, setShowReservationModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [calendarEvents, setCalendarEvents] = useState<any[]>([]);
  const [fetched, setFetched] = useState(false);

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

  const addNewFreePeriod = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (startDate >= endDate || endDate <= new Date()) {
      window.alert('Dates were not entered properly! Change them.');
    } else {
      const freePeriod = {
        startDate,
        endDate,
      };
      axios
        .post(
          '/api/fishingLessons/addFreePeriod/' + params.entityId,
          freePeriod,
          {
            headers: {
              Accept: 'application/json',
              'Content-type': 'application/json',
              Authorization:
                'Bearer ' + localStorage.getItem(LocalStorageItem.ACCESS_TOKEN),
            },
          }
        )
        .then((response) => {
          window.alert('evo me');
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  };

  useEffect(() => {
    const fetchReservations = async () => {
      const response = await fetch(`/api/reservation/instructorReservations`, {
        headers: [
          ['Authorization', 'Bearer ' + localStorageUtil.getAccessToken()],
        ],
      });

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
            };
            calendarEvents.push(event);
          });
          break;
        default:
          alert('Unknown error occurred.');
      }

      const res = await fetch(`/api/freePeriod/` + params.entityId, {
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
  }, [params.instructorId]);

  return (
    <div>
      {showReservationModal && (
        <InstructorCalendarModal
          entityId={params.entityId}
          instructorId={params.instructorId}
          setShowModal={setShowReservationModal}
        />
      )}
      {showReportModal && (
        <ReportModal close={() => setShowReportModal(false)} />
      )}
      <InstructorCalendarNavbar entityId={params.entityId} />
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
                  setShowReservationModal(true);
                } else if (new Date() > new Date(event.to)) {
                  setShowReportModal(true);
                }
              }
            }}
          />
        )}
      </div>
      {calendarEvents?.length && <div>{calendarEvents.length}</div>}
    </div>
  );
};

export default InstructorCalendar;
