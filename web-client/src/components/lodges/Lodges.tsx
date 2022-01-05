import axios from 'axios';
import { useEffect, useState } from 'react';
import { ReservationEntityType } from '../../model/reservation-entity-type.enum';
import ReservationEntities from '../reservation-entities/ReservationEnities';
const Lodges = () => {
  const [lodges, setLodges] = useState([])

  
  useEffect(() => {
    axios.get("reservationEntity/lodges",{
      headers:{
        Accept : 'application/json',
        'Content-type': 'application/json',
        'Authorization':"Bearer eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzcHJpbmctc2VjdXJpdHktZXhhbXBsZSIsInN1YiI6ImJvZ2Rhbm92aWNvZ25qZW5AZ21haWwuY29tIiwiYXVkIjoid2ViIiwiaWF0IjoxNjQxMzI0OTQ2LCJleHAiOjE2NDEzMjY3NDZ9.ilQkjiEsOGBFhy7aYATqbJwI12xSun-aiRunUtoBKMNc6bd3lJ1crlWFIplgAgwI3IZYDkdYuBT_WoRmTtszvw" 
      }
    }).then((response) => {
      setLodges(response.data)
    })

  },[])

  return (
    <ReservationEntities
      reservationEntityType={ReservationEntityType.LODGE}
      entities={lodges}
    />
  );
};

export default Lodges;
