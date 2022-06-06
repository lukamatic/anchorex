import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import localStorageUtil from '../../utils/local-storage/local-storage-util';
import LoadingSpinner from '../common/LoadingSpinner';
import AdminComplaint from './AdminComplaint';

const AdminComplaints = () => {
  const history = useHistory();

  const [complaints, setComplaints] = useState<any[]>();
  const [reportsBackup, setReportsBackup] = useState<any[]>();

  useEffect(() => {
    fetch('/api/complaints/all', {
      headers: [
        ['Authorization', 'Bearer ' + localStorageUtil.getAccessToken()],
      ],
    }).then((response) => {
      switch (response.status) {
        case HttpStatusCode.OK:
          response.json().then((value) => {
            setComplaints(value);
            setReportsBackup(value);
          });
          break;
        case HttpStatusCode.UNAUTHORIZED:
          history.push('/login');
          break;
      }
    });
  }, []);

  const onApproveReject = () => {
    setComplaints(complaints?.map((req) => req));
  };

  const filter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case 'PENDING':
        setComplaints(
          reportsBackup?.filter((report) => report.status === 'PENDING')
        );
        break;
      case 'ANSWERED':
        setComplaints(
          reportsBackup?.filter((report) => report.status === 'ANSWERED')
        );
        break;
      default:
        setComplaints(reportsBackup);
    }
  };

  return (
    <div className='flex flex-grow flex-col items-center bg-blue-50'>
      <div className='my-5'>
        Show:
        <select className='ml-2 input' onChange={filter}>
          <option value='ALL'>All</option>
          <option value='PENDING'>Pending</option>
          <option value='ANSWERED'>Answered</option>
        </select>
      </div>
      {complaints ? (
        complaints.map((report) => {
          return (
            <AdminComplaint
              key={report.id}
              complaint={report}
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

export default AdminComplaints;
