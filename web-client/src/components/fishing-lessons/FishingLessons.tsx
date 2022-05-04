import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext, { unsignedUser } from '../../context/auth-context';
import { ReservationEntityType } from '../../model/reservation-entity-type.enum';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import localStorageUtil from '../../utils/local-storage/local-storage-util';
import ReservationEntities from '../reservation-entities/ReservationEnities';

const FishingLessons = () => {
  const [lessons, setLessons] = useState([]);
  const authContext = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    fetch(`/api/fishingLessons?ownerId=${authContext.user.id}`, {
      headers: [
        ['Authorization', 'Bearer ' + localStorageUtil.getAccessToken()],
      ],
    }).then((response) => {
      switch (response.status) {
        case HttpStatusCode.OK:
          response.json().then((value) => setLessons(value));
          break;
        case HttpStatusCode.UNAUTHORIZED:
          authContext.updateAuthContext(unsignedUser);
          localStorageUtil.setUser(unsignedUser);
          history.push('/login');
          break;
        default:
          console.log('Unknown error occured.');
      }
    });
  }, []);

  return (
    <ReservationEntities
      reservationEntityType={ReservationEntityType.FISHING_LESSON}
      entities={lessons}
    />
  );
};

export default FishingLessons;
