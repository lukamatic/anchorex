import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import localStorageUtil from '../../utils/local-storage/local-storage-util';
import LoadingSpinner from '../common/LoadingSpinner';
import ServiceSignupRequest from './ServiceSignupRequest';

const ServiceSignupRequests = () => {
  const history = useHistory();

  const [signupRequests, setSignupRequests] = useState<any[]>();
  const [signupRequestsBackup, setSignupRequestsBackup] = useState<any[]>();

  useEffect(() => {
    fetch('/api/serviceSignupRequests/all', {
      headers: [
        ['Authorization', 'Bearer ' + localStorageUtil.getAccessToken()],
      ],
    }).then((response) => {
      switch (response.status) {
        case HttpStatusCode.OK:
          response.json().then((value) => {
            setSignupRequests(value);
            setSignupRequestsBackup(value);
          });
          break;
        case HttpStatusCode.UNAUTHORIZED:
          history.push('/login');
          break;
      }
    });
  }, []);

  const onApproveReject = () => {
    setSignupRequests(signupRequests?.map((req) => req));
  };

  const filter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case 'PENDING':
        setSignupRequests(
          signupRequestsBackup?.filter(
            (signupRequest) => signupRequest.status === 'PENDING'
          )
        );
        break;
      case 'APPROVED':
        setSignupRequests(
          signupRequestsBackup?.filter(
            (signupRequest) => signupRequest.status === 'APPROVED'
          )
        );
        break;
      case 'REJECTED':
        setSignupRequests(
          signupRequestsBackup?.filter(
            (signupRequest) => signupRequest.status === 'REJECTED'
          )
        );
        break;
      default:
        setSignupRequests(signupRequestsBackup);
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
      {signupRequests ? (
        signupRequests.map((signupRequest) => {
          return (
            <ServiceSignupRequest
              key={signupRequest.id}
              signupRequest={signupRequest}
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

export default ServiceSignupRequests;
