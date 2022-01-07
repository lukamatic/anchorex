import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import localStorageUtil from '../../utils/local-storage/local-storage-util';
import LoadingSpinner from '../common/LoadingSpinner';
import RejectionPopup from './RejectionPopup';

const ServiceSignupRequest = (props: {
  signupRequest: any;
  onApproveReject: () => void;
}) => {
  const history = useHistory();

  const [rejectionPopupVisible, setRejectionPopupVisible] = useState(false);
  const [fetching, setFetching] = useState(false);

  const approve = async () => {
    setFetching(true);

    const response = await fetch(
      '/api/serviceSignupRequests/approve/' + props.signupRequest.id,
      {
        method: 'POST',
        headers: [
          ['Authorization', 'Bearer ' + localStorageUtil.getAccessToken()],
        ],
      }
    );

    switch (response.status) {
      case HttpStatusCode.OK:
        props.signupRequest.status = 'APPROVED';
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

  const toggleRejectionPopup = () => {
    setRejectionPopupVisible(!rejectionPopupVisible);
  };

  return (
    <div className='flex flex-col bg-white m-5 p-3 shadow-lg'>
      {rejectionPopupVisible && (
        <RejectionPopup
          toggle={toggleRejectionPopup}
          signupRequest={props.signupRequest}
          onApproveReject={props.onApproveReject}
        />
      )}
      <div>
        {props.signupRequest.user.firstName +
          ' ' +
          props.signupRequest.user.lastName}
      </div>
      <div>{props.signupRequest.status}</div>
      {fetching ? (
        <LoadingSpinner />
      ) : (
        <div>
          {props.signupRequest.status === 'PENDING' && (
            <div>
              <button className='btnBlueWhite' onClick={approve}>
                Approve
              </button>
              <button className='btnRedWhite' onClick={toggleRejectionPopup}>
                Reject
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ServiceSignupRequest;
