import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import localStorageUtil from '../../utils/local-storage/local-storage-util';
import LoadingSpinner from '../common/LoadingSpinner';
import AdminsUserListItem from './AdminsUserListItem';

const AdminsUserList = () => {
  const history = useHistory();

  const [users, setUsers] = useState<any[]>();

  useEffect(() => {
    fetch('/api/users/all', {
      headers: [
        ['Authorization', 'Bearer ' + localStorageUtil.getAccessToken()],
      ],
    }).then((response) => {
      switch (response.status) {
        case HttpStatusCode.OK:
          response.json().then((value) => {
            setUsers(value);
          });
          break;
        case HttpStatusCode.UNAUTHORIZED:
          history.push('/login');
          break;
      }
    });
  }, []);

  const onUserDelete = (deletedUserId: number) => {
    setUsers(users?.filter((user) => user.id !== deletedUserId));
  };

  return (
    <div className='flex flex-grow flex-col items-center bg-blue-50'>
      {users ? (
        users.map((user) => {
          return (
            <AdminsUserListItem
              key={user.id}
              user={user}
              onUserDelete={onUserDelete}
            />
          );
        })
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default AdminsUserList;
