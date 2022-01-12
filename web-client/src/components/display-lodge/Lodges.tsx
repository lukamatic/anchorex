import axios from "axios";
import { useEffect, useState } from "react";
import { ReservationEntityType } from "../../model/reservation-entity-type.enum";
import { LocalStorageItem } from "../../utils/local-storage/local-storage-item.enum";
import ReservationEntities from "../reservation-entities/ReservationEnities";
const Lodges = () => {
  const [lodges, setLodges] = useState([]);
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
        findLodge(response.data.id);
      });

    const findLodge = (id: number) => {
      axios
        .get("/api/reservationEntity/lodges/" + id, {
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            Authorization:
              "Bearer " + localStorage.getItem(LocalStorageItem.ACCESS_TOKEN),
          },
        })
        .then((response) => {
          setLodges(response.data);
        });
    };
  },[]);

  return (
    <ReservationEntities
      reservationEntityType={ReservationEntityType.LODGE}
      entities={lodges}
    />
  );
};

export default Lodges;
