import { ReservationEntityType } from '../../model/reservation-entity-type.enum';
import ReservationEntities from '../reservation-entities/ReservationEnities';
const Lodges = () => {
  const lodges = [
    { id: 1, name: 'Lodge 1'},
    { id: 2, name: 'Lodge 2' },
  ];

  return (
    <ReservationEntities
      reservationEntityType={ReservationEntityType.LODGE}
      entities={lodges}
    />
  );
};

export default Lodges;
