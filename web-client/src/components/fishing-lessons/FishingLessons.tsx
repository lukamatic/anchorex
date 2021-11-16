import { ReservationEntityType } from '../../model/reservation-entity-type.enum';
import ReservationEnities from '../reservation-entities/ReservationEnities';

const FishingLessons = () => {
  const lessons = [
    { id: 0, name: 'lesson 1' },
    { id: 1, name: 'Lesson 2' },
  ];

  return (
    <ReservationEnities
      reservationEntityType={ReservationEntityType.FISHING_LESSON}
      entities={lessons}
    />
  );
};

export default FishingLessons;
