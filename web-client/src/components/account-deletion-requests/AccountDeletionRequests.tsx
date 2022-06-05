import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import localStorageUtil from '../../utils/local-storage/local-storage-util';
import LoadingSpinner from '../common/LoadingSpinner';
import AccountDeletionRequest from './AccountDeletionRequest';

const AccountDeletionRequests = () => {
  const history = useHistory();

  const [requests, setRequests] = useState<any[]>();
  const [requestsBackup, setRequestsBackup] = useState<any[]>();

  useEffect(() => {
    fetch('/api/accountDeletionRequests/all', {
      headers: [
        ['Authorization', 'Bearer ' + localStorageUtil.getAccessToken()],
      ],
    }).then((response) => {
      switch (response.status) {
        case HttpStatusCode.OK:
          response.json().then((value) => {
            setRequests(value);
            setRequestsBackup(value);
          });
          break;
        case HttpStatusCode.UNAUTHORIZED:
          history.push('/login');
          break;
      }
    });
  }, []);

  const onApproveReject = () => {
    setRequests(requests?.map((req) => req));
  };

  const filter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case 'PENDING':
        setRequests(
          requestsBackup?.filter(
            (signupRequest) => signupRequest.status === 'PENDING'
          )
        );
        break;
      case 'APPROVED':
        setRequests(
          requestsBackup?.filter(
            (signupRequest) => signupRequest.status === 'APPROVED'
          )
        );
        break;
      case 'REJECTED':
        setRequests(
          requestsBackup?.filter(
            (signupRequest) => signupRequest.status === 'REJECTED'
          )
        );
        break;
      default:
        setRequests(requestsBackup);
    }
  };

  return (
    <div className='flex flex-grow flex-col items-center bg-blue-50'>
      <div className='my-5'>
        Show:
        <select className='ml-2 input' onChange={filter}>
          <option value='ALL'>All</option>
          <option value='PENDING'>Pending</option>
          <option value='APPROVED'>Approved</option>
          <option value='REJECTED'>Rejected</option>
        </select>
      </div>
      {requests ? (
        requests.map((signupRequest) => {
          return (
            <AccountDeletionRequest
              key={signupRequest.id}
              request={signupRequest}
              onApproveReject={onApproveReject}
            />
          );
        })
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default AccountDeletionRequests;
