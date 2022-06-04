import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import localStorageUtil from '../../utils/local-storage/local-storage-util';
import LoadingSpinner from '../common/LoadingSpinner';

const AdminReport = (props: { report: any; onApproveReject: () => void }) => {
  const history = useHistory();

  const [fetching, setFetching] = useState(false);
  const [givePenalty, setGivePenalty] = useState(false);

  const approve = async () => {
    setFetching(true);

    const response = await fetch(
      '/api/reservationReports/approve/' +
        props.report.id +
        '?penalty=' +
        givePenalty,
      {
        method: 'POST',
        headers: [
          ['Authorization', 'Bearer ' + localStorageUtil.getAccessToken()],
        ],
      }
    );

    switch (response.status) {
      case HttpStatusCode.OK:
        props.report.status = 'APPROVED';
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

  const reject = async () => {
    setFetching(true);

    const response = await fetch(
      '/api/reservationReports/reject/' + props.report.id,
      {
        method: 'POST',
        headers: [
          ['Authorization', 'Bearer ' + localStorageUtil.getAccessToken()],
        ],
      }
    );

    switch (response.status) {
      case HttpStatusCode.OK:
        props.report.status = 'REJECTED';
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
  const onGivePenaltyChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setGivePenalty(event.target.checked);
  };

  return (
    <div className='flex flex-col bg-white m-5 p-3 shadow-xl w-700px'>
      <div className='flex items-center mb-2'>
        <p>Sender:</p>
        <p className='ml-3 input'>
          {props.report.owner.firstName + ' ' + props.report.owner.lastName}
        </p>
      </div>
      <div className='flex items-center mb-2'>
        <p>Client:</p>
        <p className='ml-3 input'>
          {props.report.client.firstName + ' ' + props.report.client.lastName}
        </p>
      </div>
      <div className='flex items-center mb-2'>
        <p>Client showed up:</p>
        <p className='ml-3 input'>
          {props.report.clientShowedUp ? 'yes' : 'no'}
        </p>
      </div>
      <div className='flex items-center mb-2'>
        <p>Penalty suggested:</p>
        <p className='ml-3 input'>
          {props.report.penaltySuggestion ? 'yes' : 'no'}
        </p>
      </div>
      <div className='flex items-center mb-2'>
        <p>Status:</p>
        <p className='ml-3 input'>{props.report.status}</p>
      </div>
      <p>Comment:</p>
      <textarea
        className='input resize-none h-20 mx-7 mt-2 mb-1'
        value={props.report.comment}
        disabled={true}
      />
      {props.report.status === 'PENDING' &&
        props.report.penaltySuggestion &&
        props.report.clientShowedUp && (
          <div className='flex items-center'>
            <p>Give penalty:</p>
            <input
              className='ml-3 w-4 h-4'
              type='checkbox'
              onChange={onGivePenaltyChangeHandler}
            />
          </div>
        )}
      {fetching ? (
        <LoadingSpinner />
      ) : (
        <div>
          {props.report.status === 'PENDING' && (
            <div className='flex justify-end mt-2 pr-8'>
              <button className='btnBlueWhite' onClick={approve}>
                Approve
              </button>
              <button className='btnRedWhite ml-3' onClick={reject}>
                Reject
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminReport;
