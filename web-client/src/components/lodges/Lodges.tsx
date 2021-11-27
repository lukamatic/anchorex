import { ReservationEntityType } from '../../model/reservation-entity-type.enum';
import ReservationEntities from '../reservation-entities/ReservationEnities';

const Lodges = () => {
  const lodges = [
    { id: 0, name: 'Lodge 1', description: 'The best lodge in Novi Sad', 
    enterierImage:'', exterierImage:'', roomNumber:20, bedNumber:[2, 3, 4], 
    dateReservationStart:'12-12-2020', dateReservationEnd:'12-15-2020',
    rules:'Nema cigareta u sobi, nema pravljenja buke!', priceList:'20 $ noc sa doruckom',
    additionalInfo:'Nove posteljine svakog jutra'},
    { id: 1, name: 'Lodge 2' },
  ];

  return (
    <ReservationEntities
      reservationEntityType={ReservationEntityType.LODGE}
      entities={lodges}
    />
  );
};

export default Lodges;
