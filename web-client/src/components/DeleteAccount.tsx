import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { HttpStatusCode } from '../utils/http-status-code.enum';
import localStorageUtil from '../utils/local-storage/local-storage-util';

const DeleteAccount = () => {
  const history = useHistory();
  const [reason, setReason] = useState('');

  const reasonChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setReason(event.target.value);
  };

  const sendRequest = async () => {
    const response = await fetch(
      '/api/accountDeletionRequests/create?reason=' + reason,
      {
        method: 'POST',
        headers: [
          ['Authorization', 'Bearer ' + localStorageUtil.getAccessToken()],
        ],
      }
    );

    switch (response.status) {
      case HttpStatusCode.CREATED:
        alert('Account deletion request sent.');
        history.push('/');
        break;
      default:
        alert('Unknown error occurred.');
    }
  };

  return (
    <div className='flex flex-col items-center pt-20'>
      <div>Why do you want to delete your account?</div>
      <textarea
        className='input resize-none w-96 h-40 my-5'
        maxLength={150}
        placeholder='Reason'
        onChange={reasonChangeHandler}
      />
      <button className='btnBlueWhite text-base' onClick={sendRequest}>
        Request account deletion
      </button>
    </div>
  );
};

export default DeleteAccount;
