import { ReservationEntityType } from '../../model/reservation-entity-type.enum';
import ReservationEntities from '../reservation-entities/ReservationEnities';
import ReservationEntityDisplay from '../reservation-entities/ReservationEntity';

const Lodges = () => {
  const lodges = [
    { id: 1, name: 'Lodge 1', description: 'The best lodge in Novi Sad', 
    enterierImage:'', exterierImage:'',
    dateReservationStart:'12-12-2020', dateReservationEnd:'12-15-2020',
    additionalInfo:'Nove posteljine svakog jutra'},
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
