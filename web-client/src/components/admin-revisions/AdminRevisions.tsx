import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import localStorageUtil from '../../utils/local-storage/local-storage-util';
import LoadingSpinner from '../common/LoadingSpinner';
import AdminRevision from './AdminRevision';

const AdminRevisions = () => {
  const history = useHistory();

  const [revisions, setReports] = useState<any[]>();
  const [revisionsBackup, setReportsBackup] = useState<any[]>();

  useEffect(() => {
    fetch('/api/revisions/all', {
      headers: [
        ['Authorization', 'Bearer ' + localStorageUtil.getAccessToken()],
      ],
    }).then((response) => {
      switch (response.status) {
        case HttpStatusCode.OK:
          response.json().then((value) => {
            setReports(value);
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
    setReports(revisions?.map((req) => req));
  };

  const filter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case 'PENDING':
        setReports(
          revisionsBackup?.filter((revision) => revision.status === 'PENDING')
        );
        break;
      case 'APPROVED':
        setReports(
          revisionsBackup?.filter((revision) => revision.status === 'APPROVED')
        );
        break;
      case 'REJECTED':
        setReports(
          revisionsBackup?.filter((revision) => revision.status === 'REJECTED')
        );
        break;
      default:
        setReports(revisionsBackup);
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
      {revisions ? (
        revisions.map((revision) => {
          return (
            <AdminRevision
              key={revision.id}
              revision={revision}
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

export default AdminRevisions;
