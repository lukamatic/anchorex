import axios from 'axios';
import { useEffect, useState } from 'react';
import { ReservationEntityType } from '../../model/reservation-entity-type.enum';
import { LocalStorageItem } from '../../utils/local-storage/local-storage-item.enum';
import ReservationEntities from '../reservation-entities/ReservationEnities';
const Ships = () => {
  const [ships, setShips] = useState([])

  useEffect(() => {
    axios
      .get("api/auth/email", {
        params: {
          email: localStorage.getItem(LocalStorageItem.email),
        },
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization:
            "Bearer " + localStorage.getItem(LocalStorageItem.ACCESS_TOKEN),
        },
      })
      .then((response) => {
        findShips(response.data.id);
      });

    const findShips = (id: number) => {
      axios
        .get("/api/ship/ships/" + id, {
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            Authorization:
              "Bearer " + localStorage.getItem(LocalStorageItem.ACCESS_TOKEN),
          },
        })
        .then((response) => {
          setShips(response.data);
        });
    };
  },[]);

  return (
    <ReservationEntities
      reservationEntityType={ReservationEntityType.SHIP}
      entities={ships}
    />
  );
};

export default Ships;
