import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import localStorageUtil from '../../utils/local-storage/local-storage-util';
import LoadingSpinner from '../common/LoadingSpinner';

const AdminComplaint = (props: {
  complaint: any;
  onApproveReject: () => void;
}) => {
  const history = useHistory();

  const [fetching, setFetching] = useState(false);
  const [answer, setAnswer] = useState('');

  const approve = async () => {
    setFetching(true);

    const response = await fetch(
      `/api/complaints/answer/${props.complaint.id}?answer=${answer}`,
      {
        method: 'POST',
        headers: [
          ['Authorization', 'Bearer ' + localStorageUtil.getAccessToken()],
        ],
      }
    );

    switch (response.status) {
      case HttpStatusCode.OK:
        props.complaint.status = 'ANSWERED';
        props.onApproveReject();
        break;
      case HttpStatusCode.UNAUTHORIZED:
        history.push('/login');
        break;
      default:
        alert('Unknown error occurred.');
    }

    setFetching(false);
  };

  const answerChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setAnswer(event.target.value);
  };

  return (
    <div className='flex flex-col bg-white m-5 p-3 shadow-xl w-700px'>
      <div className='flex items-center mb-2'>
        <p>Sender:</p>
        <p className='ml-3 input'>
          {props.complaint.user.firstName + ' ' + props.complaint.user.lastName}
        </p>
      </div>
      <div className='flex items-center mb-2'>
        <p>Reservation entity:</p>
        <p className='ml-3 input'>{props.complaint.reservationEntityName}</p>
      </div>
      <div className='flex items-center mb-2'>
        <p>Status:</p>
        <p className='ml-3 input'>{props.complaint.status}</p>
      </div>
      <p>Comment:</p>
      <textarea
        className='input resize-none h-20 mx-7 mt-2 mb-1'
        value={props.complaint.comment}
        disabled={true}
      />
      {props.complaint.status === 'PENDING' && (
        <>
          <p>Admin answer:</p>
          <textarea
            className='input resize-none h-20 mx-7 mt-2 mb-1'
            onChange={answerChangeHandler}
          />
        </>
      )}
      {fetching ? (
        <LoadingSpinner />
      ) : (
        <div>
          {props.complaint.status === 'PENDING' && (
            <div className='flex justify-end mt-2 pr-8'>
              <button className='btnBlueWhite' onClick={approve}>
                Answer
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminComplaint;
