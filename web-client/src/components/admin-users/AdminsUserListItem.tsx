import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import localStorageUtil from '../../utils/local-storage/local-storage-util';
import LoadingSpinner from '../common/LoadingSpinner';

const AdminsUserListItem = (props: {
  user: any;
  onUserDelete: (deletedUserId: number) => void;
}) => {
  const history = useHistory();

  const [fetching, setFetching] = useState(false);

  const deleteUser = async () => {
    setFetching(true);

    const response = await fetch('/api/users/' + props.user.id, {
      method: 'DELETE',
      headers: [
        ['Authorization', 'Bearer ' + localStorageUtil.getAccessToken()],
      ],
    });

    switch (response.status) {
      case HttpStatusCode.NO_CONTENT:
        props.onUserDelete(props.user.id);
        break;
      case HttpStatusCode.UNAUTHORIZED:
        history.push('/login');
        break;
      default:
        alert('Unknown error occurred.');
    }

    setFetching(false);
  };

  return (
    <div className='flex flex-col bg-white m-5 p-3 shadow-xl w-700px'>
      <div className='flex items-center mb-2'>
        <p className='w-16'>Name:</p>
        <p className='input'>
          {props.user.firstName + ' ' + props.user.lastName}
        </p>
      </div>
      <div className='flex items-center mb-2'>
        <p className='w-16'>Role:</p>
        <p className='input'>
          {props.user.role.substring(5, props.user.role.length)}
        </p>
      </div>
      <div className='flex items-center mb-2'>
        <p className='w-16'>Email:</p>
        <p className='input'>{props.user.email}</p>
      </div>
      {fetching ? (
        <LoadingSpinner />
      ) : (
        <button className='btnRedWhite ml-3 self-end' onClick={deleteUser}>
          Delete
        </button>
      )}
    </div>
  );
};

export default AdminsUserListItem;
