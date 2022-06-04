import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import localStorageUtil from '../../utils/local-storage/local-storage-util';
import LoadingSpinner from '../common/LoadingSpinner';
import AdminReport from './AdminReport';

const AdminReports = () => {
  const history = useHistory();

  const [reports, setReports] = useState<any[]>();
  const [reportsBackup, setReportsBackup] = useState<any[]>();

  useEffect(() => {
    fetch('/api/reservationReports/all', {
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
    setReports(reports?.map((req) => req));
  };

  const filter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case 'PENDING':
        setReports(
          reportsBackup?.filter((report) => report.status === 'PENDING')
        );
        break;
      case 'APPROVED':
        setReports(
          reportsBackup?.filter((report) => report.status === 'APPROVED')
        );
        break;
      case 'REJECTED':
        setReports(
          reportsBackup?.filter((report) => report.status === 'REJECTED')
        );
        break;
      default:
        setReports(reportsBackup);
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
      {reports ? (
        reports.map((report) => {
          return (
            <AdminReport
              key={report.id}
              report={report}
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

export default AdminReports;
