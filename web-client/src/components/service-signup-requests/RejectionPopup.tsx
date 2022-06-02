import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import localStorageUtil from '../../utils/local-storage/local-storage-util';
import ErrorLabel from '../common/ErrorLabel';
import LoadingSpinner from '../common/LoadingSpinner';
import PopupHeader from '../common/PopupHeader';

const RejectionPopup = (props: {
  toggle: () => void;
  signupRequest: any;
  onApproveReject: () => void;
}) => {
  const history = useHistory();

  const [reason, setReason] = useState('');
  const [errorText, setErrorText] = useState('');
  const [fetching, setFetching] = useState(false);

  const reasonChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setReason(event.target.value);
  };

  const reject = async () => {
    if (!reason) {
      setErrorText('Rejection reason must be provided.');
      return;
    }

    setFetching(true);

    const response = await fetch(
      '/api/serviceSignupRequests/reject/' + props.signupRequest.id,
      {
        method: 'POST',
        headers: [
          ['Authorization', 'Bearer ' + localStorageUtil.getAccessToken()],
          ['Content-type', 'application/json'],
        ],
        body: JSON.stringify({ reason: reason }),
      }
    );

    switch (response.status) {
      case HttpStatusCode.OK:
        props.signupRequest.status = 'REJECTED';
        props.onApproveReject();
        break;
      case HttpStatusCode.UNAUTHORIZED:
        history.push('/login');
        break;
      default:
        alert('Unknown error occurred.');
    }

    setFetching(false);
    props.toggle();
  };

  return (
    <div className='fixed inset-0 bg-gray-900 bg-opacity-50 h-full w-full'>
      <div className='flex items-center justify-center h-full'>
        <div className='flex flex-col bg-white md:w-1/3 h-auto rounded'>
          <PopupHeader
            title='Service signup request rejection'
            toggle={props.toggle}
          />
          <p className='ml-5 mt-2 text-lg'>Reason:</p>
          <textarea
            className='input resize-none h-40 mx-7 mt-2 mb-1'
            maxLength={150}
            placeholder='Enter rejection reason'
            onChange={reasonChangeHandler}
          />
          <ErrorLabel text={errorText} />
          <div className='self-center mb-3'>
            {fetching ? (
              <LoadingSpinner />
            ) : (
              <button className='btnRedWhite w-32' onClick={reject}>
                Reject
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RejectionPopup;
