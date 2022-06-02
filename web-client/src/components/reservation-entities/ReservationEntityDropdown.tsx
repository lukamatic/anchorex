import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth-context';
import { UserRole } from '../../model/user-role.enum';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import { LocalStorageItem } from '../../utils/local-storage/local-storage-item.enum';
import localStorageUtil from '../../utils/local-storage/local-storage-util';

const ReservationEntityDropdown = (props: { entityId: number }) => {
  const authContext = useContext(AuthContext);
  const userRole = authContext.user.role;
  const [isDropdownHidden, setIsDropdownHidden] = useState(true);

  const togglePopup = () => {
    setIsDropdownHidden(!isDropdownHidden);
  };

  const hidePopup = () => {
    setIsDropdownHidden(true);
  };

  const remove =
    (id: number) => async (event: React.MouseEvent<HTMLButtonElement>) => {
      if (userRole === UserRole.INSTRUCTOR) {
        const response = await fetch(`/api/fishingLessons/${props.entityId}`, {
          method: 'DELETE',
          headers: [
            ['Authorization', 'Bearer ' + localStorageUtil.getAccessToken()],
          ],
        });

        switch (response.status) {
          case HttpStatusCode.NO_CONTENT:
            alert('Fishing lesson successfully deleted.');
            window.location.reload();
            return;
          default:
            alert('Unknown error occurred.');
            return;
        }
      }

      var url = '/api/';
      if (userRole === UserRole.LODGE_OWNER) {
        url += 'lodge/deleteLodge/';
      } else if (userRole === UserRole.SHIP_OWNER) {
        url += 'ship/deleteShip/';
      }
      axios
        .delete(url + id, {
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
            Authorization:
              'Bearer ' + localStorage.getItem(LocalStorageItem.ACCESS_TOKEN),
          },
        })
        .then((response) => {
          hidePopup();
          window.location.reload();
        });
    };

  const onBlur = (event: React.FocusEvent<HTMLButtonElement, Element>) => {
    if (!event.relatedTarget?.id.startsWith('dropdown-')) {
      hidePopup();
    }
  };

  return (
    <div className='relative inline-block'>
      <button
        className='flex text-gray-400 hover:text-blue-500 focus:text-blue-500 px-1'
        aria-expanded='true'
        aria-haspopup='true'
        onClick={togglePopup}
        onBlur={onBlur}
      >
        <svg
          className='w-6 h-6'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z'
          ></path>
        </svg>
      </button>
      <div
        className='absolute right-4 top-4 bg-blue-500 shadow-xl rounded-md z-10'
        hidden={isDropdownHidden}
      >
        <div className='flex flex-col w-24 text-white'>
          {userRole === UserRole.LODGE_OWNER ? (
            <Link
              className='p-1 hover:bg-blue-400 hover:text-white rounded-t-md text-center border-b border-white'
              to={'/lodge/' + props.entityId}
              id={'dropdown-link-' + props.entityId}
            >
              Edit
            </Link>
          ) : userRole === UserRole.SHIP_OWNER ? (
            <Link
              className='p-1 hover:bg-blue-400 hover:text-white rounded-t-md text-center border-b border-white'
              to={'/ship/' + props.entityId}
              id={'dropdown-link-' + props.entityId}
            >
              Edit
            </Link>
          ) : (
            <div></div>
          )}

          <button
            className='p-1 hover:bg-blue-400 hover:text-white rounded-b-md'
            onClick={remove(props.entityId)}
            id={'dropdown-remove-' + props.entityId}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationEntityDropdown;
