import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import localStorageUtil from '../../utils/local-storage/local-storage-util';
import LoadingSpinner from '../common/LoadingSpinner';

const AdminRevision = (props: {
  revision: any;
  onApproveReject: () => void;
}) => {
  const history = useHistory();

  const [fetching, setFetching] = useState(false);

  const approve = async () => {
    setFetching(true);

    const response = await fetch(
      '/api/revisions/approve/' + props.revision.id,
      {
        method: 'POST',
        headers: [
          ['Authorization', 'Bearer ' + localStorageUtil.getAccessToken()],
        ],
      }
    );

    switch (response.status) {
      case HttpStatusCode.OK:
        props.revision.status = 'APPROVED';
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

    const response = await fetch('/api/revisions/reject/' + props.revision.id, {
      method: 'POST',
      headers: [
        ['Authorization', 'Bearer ' + localStorageUtil.getAccessToken()],
      ],
    });

    switch (response.status) {
      case HttpStatusCode.OK:
        props.revision.status = 'REJECTED';
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

  return (
    <div className='flex flex-col bg-white m-5 p-3 shadow-xl w-700px'>
      <div className='flex items-center mb-2'>
        <p>Reservation entity:</p>
        <p className='ml-3 input'>{props.revision.reservationEntity.name}</p>
      </div>
      <div className='flex items-center mb-2'>
        <p>Status:</p>
        <p className='ml-3 input'>{props.revision.status}</p>
      </div>
      <div className='flex items-center mb-2'>
        <p>Rating:</p>
        <p className='ml-3 input'>{props.revision.rating}</p>
      </div>
      <p>Comment:</p>
      <textarea
        className='input resize-none h-20 mx-7 mt-2 mb-1'
        value={props.revision.comment}
        disabled={true}
      />
      {fetching ? (
        <LoadingSpinner />
      ) : (
        <div>
          {props.revision.status === 'PENDING' && (
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

export default AdminRevision;
