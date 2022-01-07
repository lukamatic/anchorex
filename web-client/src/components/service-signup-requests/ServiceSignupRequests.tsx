import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import localStorageUtil from '../../utils/local-storage/local-storage-util';
import LoadingSpinner from '../common/LoadingSpinner';
import ServiceSignupRequest from './ServiceSignupRequest';

const ServiceSignupRequests = () => {
  const history = useHistory();

  const [signupRequests, setSignupRequests] = useState<any[]>();

  useEffect(() => {
    fetch('/api/serviceSignupRequests/all', {
      headers: [
        ['Authorization', 'Bearer ' + localStorageUtil.getAccessToken()],
      ],
    }).then((response) => {
      switch (response.status) {
        case HttpStatusCode.OK:
          response.json().then((value) => setSignupRequests(value));
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

  return (
    <div className='flex flex-col items-center bg-blue-50'>
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
