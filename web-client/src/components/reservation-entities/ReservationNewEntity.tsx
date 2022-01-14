import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import SignupInput from "../signup/SignupInput";
import { useHistory } from "react-router-dom";
import { LocalStorageItem } from "../../utils/local-storage/local-storage-item.enum";
import L from "leaflet";
import ErrorLabel from "../common/ErrorLabel";
import { UserRole } from "../../model/user-role.enum";
import AuthContext from "../../context/auth-context";

const ReservationNewEntity = () => {
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const userRole = authContext.userRole;
  const GEOCODE_URL =
    "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&langCode=EN&location=";
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [ownerId, setOwnerId] = useState(0);
  const [name, setEntityName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [conductRules, setConductRules] = useState([""]);

  const [singleBedroomNumber, setSingleBedroomNumber] = useState("");
  const [doubleBedroomNumber, setDoubleBedroomNumber] = useState("");
  const [fourBedroomNumber, setFourBedroomNumber] = useState("");

  const [type, setShipType] = useState("BOAT");
  const [length, setLength] = useState(0);
  const [engineCount, setEngineCount] = useState(0);
  const [enginePower, setEnginePower] = useState(0);
  const [maxSpeed, setMaxSpeed] = useState(0);
  const [capacity, setCapacity] = useState(0);
  const [fishingEquipment, setFishingEquipment] = useState([""]);
  const [cancellationPercentage, setCancellationPercentage] = useState(0);
  const navigationKits = ["GPS", "RADAR", "VHF-RADIO", "FISHFINDER"];

  const [newRegularServices, setRegularService] = useState([""]);
  const [newRegularServicePrices, setRegularServicePrices] = useState([0]);
  const [currentRegularService, setCurrentRegularService] = useState("");
  const [currentRegularPrice, setCurrentRegularPrice] = useState(0);
  const [newAdditionalServices, setAdditionalService] = useState([""]);
  const [newAdditionalServicePrices, setAdditionalServicePrices] = useState([
    0,
  ]);
  const [currentAdditionalService, setCurrentAdditionalService] = useState("");
  const [currentAdditionalPrice, setCurrentAdditionalPrice] = useState(0);
  const [currentRule, setCurrentRule] = useState("");
  const [currentEquipment, setCurrentEquipment] = useState("");
  const [currentNavigation, setCurrentNavigation] = useState([""]);

  const [renderedService, setRenderedService] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [renderedRule, setRenderedRule] = useState(false);
  const [renderedEquipment, setRenderedEquipment] = useState(false);

  const [nameErrorText, setNameErrorText] = useState("");
  const [descriptionErrorText, setDescriptionErrorText] = useState("");
  const [rulesErrorText, setRulesErrorText] = useState("");
  const [addressErrorText, setAddressErrorText] = useState("");
  const [errorLabelText, setErrorText] = useState("");
  const [singleBedRoomsErrorText, setOneBedRoomsErrorText] = useState("");
  const [doubleBedRoomsErrorText, setDoubleBedRoomsErrorText] = useState("");
  const [fourBedRoomsErrorText, setFourBedRoomsErrorText] = useState("");
  const [lengthErrorText, setLengthErrorText] = useState("");
  const [engineCountErrorText, setEngineCountErrorText] = useState("");
  const [enginePowerErrorText, setEnginePowerErrorText] = useState("");
  const [maxSpeedErrorText, setMaxSpeedErrorText] = useState("");
  const [capacityErrorText, setCapacityErrorText] = useState("");
  const [cancellationPercentageErrorText, setCancellationPercentageErrorText] =
    useState("");

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
        console.log(response.data.id);
        setOwnerId(response.data.id);
      });

    var mymap = L.map("mapid").setView([45.2635752, 19.8434573], 13);
    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          "pk.eyJ1Ijoib2dpamFoIiwiYSI6ImNrcXMzbjR0ZDE3N24zMXFhOXM5MDlmeWwifQ.V05sowv93LiOgv4O-0bIgw",
      }
    ).addTo(mymap);

    mymap.on("click", onMapClick);
    var coordinates = [0, 0];
    var marker: L.Marker;
    async function onMapClick(e: any) {
      if (coordinates[0] !== 0) {
        mymap.removeLayer(marker);
      }
      coordinates = e.latlng.toString().substring(7, 25).split(",");
      setLatitude(coordinates[0]);
      setLongitude(coordinates[1]);
      marker = L.marker([coordinates[0], coordinates[1]]);
      marker.addTo(mymap);
      var data = await (
        await fetch(GEOCODE_URL + `${coordinates[1]},${coordinates[0]}`)
      ).json();
      console.log(data.address);
      setAddress(data.address.Address);
      setAddressErrorText("");
      setCity(data.address.City);
      setCountry(data.address.CountryCode);
    }
  }, []);

  const nameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEntityName(value.trim());
    setNameErrorText("");
    if (!value) {
      return;
    }
  };

  const descriptionChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    setDescription(value.trim());
    setDescriptionErrorText("");
    if (!value) {
      return;
    }
  };

  const rulesChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCurrentRule(value.trim());
    console.log(conductRules);
    if (!value) {
      return;
    }
  };

  const fishingEquipmentChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setCurrentEquipment(value.trim());
    console.log(fishingEquipment);
    if (!value) {
      return;
    }
  };

  const lengthChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    var length = Number(value);
    if (length <= 0) {
      setLengthErrorText("Invalid input!");
    } else {
      setLengthErrorText("");
      setLength(length);
    }
  };

  const engineCountChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    var engineCount = Number(value);
    if (engineCount <= 0 || !Number.isInteger(engineCount)) {
      setEngineCountErrorText("Invalid input!");
    } else {
      setEngineCountErrorText("");
      setEngineCount(engineCount);
    }
  };

  const enginePowerChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    var enginePower = Number(value);
    if (enginePower <= 0) {
      setEnginePowerErrorText("Invalid input!");
    } else {
      setEnginePowerErrorText("");
      setEnginePower(enginePower);
    }
  };

  const maxSpeedChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    var maxSpeed = Number(value);
    if (maxSpeed <= 0) {
      setMaxSpeedErrorText("Invalid input!");
    } else {
      setMaxSpeedErrorText("");
      setMaxSpeed(maxSpeed);
    }
  };

  const capacityChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    var capacity = Number(value);
    if (capacity <= 0 || !Number.isInteger(capacity)) {
      setCapacityErrorText("Invalid input!");
    } else {
      setCapacityErrorText("");
      setCapacity(capacity);
    }
  };

  const cancellationPercentageChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    var percentage = Number(value);
    if (percentage <= 0 || percentage > 100) {
      setCancellationPercentageErrorText("Invalid input!");
    } else {
      setCancellationPercentageErrorText("");
      setCancellationPercentage(percentage);
    }
  };

  const reservationKitChangeHandler = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setCurrentNavigation(value);
    console.log(currentNavigation);
  };

  const typeChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setShipType(value);
    console.log(type);
  };

  const oneBedRoomChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    var roomNumber = Number(value);
    if (roomNumber < 0 || !Number.isInteger(roomNumber)) {
      setOneBedRoomsErrorText("Invalid input!");
    } else {
      setSingleBedroomNumber(value);
      setOneBedRoomsErrorText("");
    }
  };

  const doubleBedRoomChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    var roomNumber = Number(value);
    if (roomNumber < 0 || !Number.isInteger(roomNumber)) {
      setDoubleBedRoomsErrorText("Invalid input!");
    } else {
      setDoubleBedroomNumber(value);
      setDoubleBedRoomsErrorText("");
    }
  };

  const fourBedRoomChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    var roomNumber = Number(value);
    if (roomNumber < 0 || !Number.isInteger(roomNumber)) {
      setFourBedRoomsErrorText("Invalid input!");
    } else {
      setFourBedroomNumber(value);
      setFourBedRoomsErrorText("");
    }
  };

  const regularServiceChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setCurrentRegularService(value.trim());
    console.log(newRegularServices);
  };

  const regularServicePriceChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setCurrentRegularPrice(Number(value));
    console.log(newRegularServicePrices);
  };

  const additionalServiceChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setCurrentAdditionalService(value.trim());
    console.log(newAdditionalServices);
  };

  const additionalServicePriceChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setCurrentAdditionalPrice(Number(value));
    console.log(newAdditionalServicePrices);
  };

  const addNewRule = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!renderedRule) {
      const newRules = [];
      if (currentRule.length !== 0) {
        setRenderedRule(true);
        newRules.push(currentRule);
        setConductRules(newRules);
        setRulesErrorText("");
      }
    } else {
      const newRules = [...conductRules];
      if (currentRule.length > 0 && !newRules.includes(currentRule)) {
        newRules.push(currentRule);
        setConductRules(newRules);
        setRulesErrorText("");
      }
    }
  };

  const addNewEquipment = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!renderedEquipment) {
      const newEquipment = [];
      if (currentEquipment.length !== 0) {
        setRenderedEquipment(true);
        newEquipment.push(currentEquipment);
        setFishingEquipment(newEquipment);
      }
    } else {
      const newEquipment = [...fishingEquipment];
      if (
        currentEquipment.length > 0 &&
        !newEquipment.includes(currentEquipment)
      ) {
        newEquipment.push(currentEquipment);
        setFishingEquipment(newEquipment);
      }
    }
  };

  const removeRule =
    (rule: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
      const newRules = [...conductRules];
      for (let i = 0; i <= newRules.length; i++) {
        if (conductRules[i] === rule) {
          newRules.splice(i, 1);
        }
      }
      setConductRules(newRules);
    };

  const removeEquipment =
    (equipment: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
      const newEquipment = [...fishingEquipment];
      for (let i = 0; i <= newEquipment.length; i++) {
        if (fishingEquipment[i] === equipment) {
          newEquipment.splice(i, 1);
        }
      }
      setFishingEquipment(newEquipment);
    };

  const addNewRegularService = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!renderedService) {
      const newPrices = [];
      const newServices = [];
      if (currentRegularService.length !== 0 && currentRegularPrice > 0) {
        setRenderedService(true);
        newServices.push(currentRegularService);
        newPrices.push(currentRegularPrice);
        setRegularServicePrices(newPrices);
        setRegularService(newServices);
      }
    } else {
      const newServices = [...newRegularServices];
      const newPrices = [...newRegularServicePrices];
      if (
        currentRegularPrice > 0 &&
        currentRegularService.length !== 0 &&
        !newServices.includes(currentRegularService)
      ) {
        newServices.push(currentRegularService);
        newPrices.push(currentRegularPrice);
        setRegularServicePrices(newPrices);
        setRegularService(newServices);
      }
    }
  };

  const addNewAdditionalService = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (!rendered) {
      const newPrices = [];
      const newServices = [];
      if (currentAdditionalService.length !== 0 && currentAdditionalPrice > 0) {
        setRendered(true);
        newServices.push(currentAdditionalService);
        newPrices.push(currentAdditionalPrice);
        setAdditionalServicePrices(newPrices);
        setAdditionalService(newServices);
      }
    } else {
      const newServices = [...newAdditionalServices];
      const newPrices = [...newAdditionalServicePrices];
      if (
        currentAdditionalPrice > 0 &&
        currentAdditionalService.length !== 0 &&
        !newServices.includes(currentAdditionalService)
      ) {
        newServices.push(currentAdditionalService);
        newPrices.push(currentAdditionalPrice);
        setAdditionalServicePrices(newPrices);
        setAdditionalService(newServices);
      }
    }
  };

  const removeRegularService =
    (service: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
      const newServices = [...newRegularServices];
      const newPrices = [...newRegularServicePrices];
      for (let i = 0; i <= newServices.length; i++) {
        if (newServices[i] === service) {
          newServices.splice(i, 1);
          newPrices.splice(i, 1);
        }
      }
      setRegularService(newServices);
      setRegularServicePrices(newPrices);
    };

  const removeAdditionalService =
    (service: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
      const newServices = [...newAdditionalServices];
      const newPrices = [...newAdditionalServicePrices];
      for (let i = 0; i <= newServices.length; i++) {
        if (newServices[i] === service) {
          newServices.splice(i, 1);
          newPrices.splice(i, 1);
        }
      }
      setAdditionalService(newServices);
      setAdditionalServicePrices(newPrices);
    };

  const isInputValid = () => {
    if (
      nameErrorText ||
      addressErrorText ||
      descriptionErrorText ||
      rulesErrorText
    ) {
      return false;
    }

    if (userRole === UserRole.LODGE_OWNER) {
      if (
        singleBedRoomsErrorText ||
        doubleBedRoomsErrorText ||
        fourBedRoomsErrorText
      ) {
        return false;
      }
    } else if (userRole === UserRole.SHIP_OWNER) {
      if (
        lengthErrorText ||
        engineCountErrorText ||
        enginePowerErrorText ||
        maxSpeedErrorText ||
        capacityErrorText ||
        cancellationPercentageErrorText
      ) {
        return false;
      }
    }

    if (!name) {
      setNameErrorText("This field is required.");
    }

    if (!address) {
      setAddressErrorText("This field is required.");
    }

    if (!description) {
      setDescriptionErrorText("This field is required.");
    }

    if (!singleBedroomNumber) {
      setSingleBedroomNumber("This field is required.");
    }

    if (!doubleBedroomNumber) {
      setDoubleBedroomNumber("This field is required.");
    }

    if (!fourBedroomNumber) {
      setFourBedroomNumber("This field is required.");
    }

    if (!conductRules) {
      setRulesErrorText("This field is required.");
    }

    if (!length) {
      setLengthErrorText("This field is required.");
    }

    if (!engineCount) {
      setEngineCountErrorText("This field is required.");
    }

    if (!enginePower) {
      setEnginePowerErrorText("This field is required.");
    }

    if (!maxSpeed) {
      setMaxSpeedErrorText("This field is required.");
    }

    if (!capacity) {
      setCapacityErrorText("This field is required.");
    }

    if (!cancellationPercentage) {
      setCancellationPercentageErrorText("This field is required.");
    }

    if (!name || !address || !description || !conductRules) {
      return false;
    }

    if (userRole === UserRole.LODGE_OWNER) {
      if (!singleBedroomNumber || !doubleBedroomNumber || !fourBedroomNumber) {
        return false;
      }
    } else if (userRole === UserRole.SHIP_OWNER) {
      if (
        !length ||
        !engineCount ||
        !enginePower ||
        !maxSpeed ||
        !capacity ||
        !cancellationPercentage
      ) {
        return false;
      }
    }

    return true;
  };

  const createEntity = async () => {
    if (!isInputValid()) {
      setErrorText("Please fill out required fields correctly.");
    } else {
      setErrorText("");

      var rulesOfConduct = "";

      for (let i = 0; i < conductRules.length; i++) {
        if (conductRules[i] !== "") {
          rulesOfConduct += "#";
          rulesOfConduct += conductRules[i];
        }
      }
      const regularServices = [];
      for (let i = 0; i < newRegularServices.length; i++) {
        if (newRegularServices[i] !== "") {
          let info = newRegularServices[i];
          let price = newRegularServicePrices[i];
          regularServices[i] = {
            info,
            price,
          };
        }
      }
      const additionalServices = [];
      for (let i = 0; i < newAdditionalServices.length; i++) {
        if (newAdditionalServices[i] !== "") {
          let info = newAdditionalServices[i];
          let price = newAdditionalServicePrices[i];
          additionalServices[i] = {
            info,
            price,
          };
        }
      }
      const location = {
        latitude,
        longitude,
        address,
        city,
        country,
      };

      if (userRole === UserRole.LODGE_OWNER) {
        const newLodge = {
          ownerId,
          name,
          description,
          rulesOfConduct,
          singleBedroomNumber,
          doubleBedroomNumber,
          fourBedroomNumber,
          regularServices,
          additionalServices,
          location,
        };
        axios
          .post("api/lodge/createLodge", newLodge, {
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
              Authorization:
                "Bearer " + localStorage.getItem(LocalStorageItem.ACCESS_TOKEN),
            },
          })
          .then((response) => {
            window.alert("Poslato");
            history.push("/lodges");
          })
          .catch((error) => {
            window.alert(error.response.toString());
          });
      } else if (userRole === UserRole.SHIP_OWNER) {
        var fishingKit = "";
        for (let i = 0; i < fishingEquipment.length; i++) {
          if (fishingEquipment[i] !== "") {
            fishingKit += "#";
            fishingKit += fishingEquipment[i];
          }
        }
        var navigationKit = "";
        for (let i = 0; i < currentNavigation.length; i++) {
          if (currentNavigation[i] !== "") {
            navigationKit += "#";
            navigationKit += currentNavigation[i];
          }
        }
        const newShip = {
          ownerId,
          name,
          description,
          rulesOfConduct,
          type,
          length,
          engineCount,
          enginePower,
          maxSpeed,
          navigationKit,
          capacity,
          fishingKit,
          cancellationPercentage,
          regularServices,
          additionalServices,
          location,
        };
        console.log(newShip);
        axios
          .post("/api/ship/createShip", newShip, {
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
              Authorization:
                "Bearer " + localStorage.getItem(LocalStorageItem.ACCESS_TOKEN),
            },
          })
          .then((response) => {
            window.alert("Poslato");
            console.log(newShip);
            history.push("/ships");
          })
          .catch((error) => {
            window.alert(error.response.toString());
          });
      }
    }
  };

  return (
    <div className="flex flex-col flex-grow bg-gray-100 items-center p-5">
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossOrigin=""
      />
      <script
        src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
        integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
        crossOrigin=""
      ></script>
      <script
        src="https://unpkg.com/esri-leaflet@3.0.4/dist/esri-leaflet.js"
        integrity="sha512-oUArlxr7VpoY7f/dd3ZdUL7FGOvS79nXVVQhxlg6ij4Fhdc4QID43LUFRs7abwHNJ0EYWijiN5LP2ZRR2PY4hQ=="
        crossOrigin=""
      ></script>
      <link
        rel="stylesheet"
        href="https://unpkg.com/esri-leaflet-geocoder@3.1.1/dist/esri-leaflet-geocoder.css"
        integrity="sha512-IM3Hs+feyi40yZhDH6kV8vQMg4Fh20s9OzInIIAc4nx7aMYMfo+IenRUekoYsHZqGkREUgx0VvlEsgm7nCDW9g=="
        crossOrigin=""
      />
      <script src="https://unpkg.com/esri-leaflet-geocoder@3.0.0/dist/esri-leaflet-geocoder.js"></script>

      <div className="flex flex-row justify-center flex-wrap shadow-lg lg:mt-16 bg-white">
        <div className="flex flex-col items-center">
          <div className="flex flex-col mt-2 flex-grow text-lg px-8 pt-5 md:w-500px">
            <SignupInput
              type="text"
              text="Name:"
              name="name"
              placeholder="entity name"
              onChange={nameChangeHandler}
            />
            <ErrorLabel text={nameErrorText} />
            <div className="flex flex-wrap items-center">
              <p className="my-1 w-44 whitespace-nowrap">Address</p>
              <input
                className="input flex-grow md:w-60"
                type="text"
                name="address"
                value={address + " " + city}
                disabled
              />
            </div>
            <ErrorLabel text={addressErrorText} />
            <div id="mapid" className="h-96 w-auto "></div>

            {userRole === UserRole.LODGE_OWNER ? (
              <div>
                <SignupInput
                  text="Single-room"
                  type="number"
                  name="singleBedroomNumber"
                  placeholder="Enter room number"
                  onChange={oneBedRoomChangeHandler}
                />
                <ErrorLabel text={singleBedRoomsErrorText} />

                <SignupInput
                  text="Double-room"
                  type="number"
                  name="doubleBedroomNumber"
                  placeholder="Enter room number"
                  onChange={doubleBedRoomChangeHandler}
                />
                <ErrorLabel text={doubleBedRoomsErrorText} />

                <SignupInput
                  text="Four-room"
                  type="number"
                  name="fourBedroomNumber"
                  placeholder="Enter room number"
                  onChange={fourBedRoomChangeHandler}
                />
                <ErrorLabel text={fourBedRoomsErrorText} />
              </div>
            ) : userRole === UserRole.SHIP_OWNER ? (
              <div>
                <div className="flex flex-wrap items-center mt-3 mb-10">
                  <p className="my-1 w-44 whitespace-nowrap">Type</p>
                  <select
                    className="input flex-grow md:w-60"
                    onChange={typeChangeHandler}
                  >
                    <option value="BOAT">Boat</option>
                    <option value="SHIP">Ship</option>
                  </select>
                </div>
                <SignupInput
                  text="Length"
                  type="number"
                  name="length"
                  placeholder="Enter ship length"
                  onChange={lengthChangeHandler}
                />
                <ErrorLabel text={lengthErrorText} />

                <SignupInput
                  text="Engine number"
                  type="number"
                  name="engineCount"
                  placeholder="Enter engine number"
                  onChange={engineCountChangeHandler}
                />
                <ErrorLabel text={engineCountErrorText} />

                <SignupInput
                  text="Engine power"
                  type="number"
                  name="enginePower"
                  placeholder="Enter engine power"
                  onChange={enginePowerChangeHandler}
                />
                <ErrorLabel text={enginePowerErrorText} />
                <SignupInput
                  text="Max speed"
                  type="number"
                  name="maxSpeed"
                  placeholder="Enter max speed"
                  onChange={maxSpeedChangeHandler}
                />
                <ErrorLabel text={maxSpeedErrorText} />
                <SignupInput
                  text="Capacity"
                  type="number"
                  name="capacity"
                  placeholder="Enter capacity"
                  onChange={capacityChangeHandler}
                />
                <ErrorLabel text={capacityErrorText} />
                <SignupInput
                  text="Cancellation terms"
                  type="number"
                  name="cancellation"
                  placeholder="Enter percentage"
                  onChange={cancellationPercentageChangeHandler}
                />
                <ErrorLabel text={cancellationPercentageErrorText} />
                <p className="my-1">Navigation kit:</p>
                <div className="flex flex-wrap items-center ml-48">
                  <select
                    value={currentNavigation}
                    multiple
                    onChange={(e) => reservationKitChangeHandler(e)}
                  >
                    {navigationKits.map((navigation) => (
                      <option>{navigation}</option>
                    ))}
                  </select>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex flex-wrap mt-4 items-center mb-3 w-max">
            <p className="my-1">Promo description:</p>
            <p className="ml-2 text-gray-500"></p>
            <textarea
              onChange={descriptionChangeHandler}
              className="input resize-none w-full h-40"
              maxLength={150}
              placeholder="Say something about the entity"
              name="description"
            />
          </div>
          <ErrorLabel text={descriptionErrorText} />
          <div className="flex flex-col -mt-8 flex-grow text-lg px-8 py-6 md:w-500px">
            <div className="flex flex-wrap items-center mb-3">
              <p className="my-1">Rules of conduct:</p>
              <p className="ml-2 text-gray-500"></p>
              <input
                className="input resize-none w-full mb-4"
                placeholder="List rules of conduct"
                name="conductRules"
                onChange={rulesChangeHandler}
              />
              <button
                className="btnBlueWhite w-52 ml-32 mb-4"
                onClick={addNewRule}
              >
                Add
              </button>
              <div className="flex flex-wrap items-center mb-3">
                <ul>
                  {conductRules.map((c, i) => (
                    <li key={c}>
                      Conduct rule:{c}
                      {!conductRules.includes("") ? (
                        <button
                          className="btnBlueWhite w-12 h-8 ml-8"
                          onClick={removeRule(c)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      ) : (
                        <div></div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex flex-wrap items-center mb-3">
              <p className="my-1">Regular services (at least one):</p>
              <input
                className="input resize-none w-52 h-10  mb-4"
                placeholder="Add service name"
                name="additionalServices"
                onChange={regularServiceChangeHandler}
              />
              <input
                className="input resize-none w-52 h-10 ml-4 mb-4"
                placeholder="Add service price"
                name="additionalService"
                type="number"
                min="0.1"
                step="0.1"
                onChange={regularServicePriceChangeHandler}
              />
              <button
                className="btnBlueWhite w-52 ml-32"
                onClick={addNewRegularService}
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap items-center mb-3">
              <ul>
                {newRegularServices.map((d, i) => (
                  <li key={d}>
                    Service name:{d} , Price: {newRegularServicePrices[i]}$
                    {!newRegularServices.includes("") ? (
                      <button
                        className="btnBlueWhite w-12 h-8 ml-8"
                        onClick={removeRegularService(d)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    ) : (
                      <div></div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap items-center mb-3">
              <p className="my-1">Additional services:</p>
              <p className="ml-2 text-gray-500">(optional)</p>
              <input
                className="input resize-none w-52 h-10  mb-4"
                placeholder="Add service name"
                name="additionalServices"
                onChange={additionalServiceChangeHandler}
              />
              <input
                className="input resize-none w-52 h-10 ml-4 mb-4"
                placeholder="Add service price"
                name="additionalService"
                type="number"
                min="0.1"
                step="0.1"
                onChange={additionalServicePriceChangeHandler}
              />
              <button
                className="btnBlueWhite w-52 ml-32"
                onClick={addNewAdditionalService}
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap items-center mb-3">
              <ul>
                {newAdditionalServices.map((d, i) => (
                  <li key={d}>
                    Service name:{d} , Price: {newAdditionalServicePrices[i]}$
                    {!newAdditionalServices.includes("") ? (
                      <button
                        className="btnBlueWhite w-12 h-8 ml-8"
                        onClick={removeAdditionalService(d)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    ) : (
                      <div></div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            {userRole === UserRole.SHIP_OWNER ? (
              <div className="flex flex-wrap items-center mb-3">
                <p className="my-1">Fishing kit:</p>
                <p className="ml-2 text-gray-500"></p>
                <input
                  className="input resize-none w-full mb-4"
                  placeholder="List fishing kit"
                  name="fishingKit"
                  onChange={fishingEquipmentChangeHandler}
                />
                <button
                  className="btnBlueWhite w-52 ml-32 mb-4"
                  onClick={addNewEquipment}
                >
                  Add
                </button>
                <div className="flex flex-wrap items-center mb-3">
                  <ul>
                    {fishingEquipment.map((f, i) => (
                      <li key={f}>
                        Fishing kit:{f}
                        {!fishingEquipment.includes("") ? (
                          <button
                            className="btnBlueWhite w-12 h-8 ml-8"
                            onClick={removeEquipment(f)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        ) : (
                          <div></div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center my-5">
        <ErrorLabel text={errorLabelText} />
        <button className="btnBlueWhite w-72" onClick={createEntity}>
          Create entity
        </button>
      </div>
    </div>
  );
};

export default ReservationNewEntity;
