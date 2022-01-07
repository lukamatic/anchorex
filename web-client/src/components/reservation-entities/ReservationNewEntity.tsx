import React, { useEffect, useState } from "react";
import axios from "axios";
import SignupInput from "../signup/SignupInput";
import SignupError from "../signup/SignupErrorLabel";
import { useHistory } from "react-router-dom";
import { LocalStorageItem } from "../../utils/local-storage/local-storage-item.enum";
import L from "leaflet";
import localStorageUtil from "../../utils/local-storage/local-storage-util";

const ReservationNewEntity = () => {
  const history = useHistory();
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
  const [lodgePrice, setLodgePrice] = useState("");
  const [additionalServices, setAdditionalService] = useState([""]);
  const [additionalServicePrices, setAdditionalServicePrices] = useState([0]);
  const [currentService, setCurrentService] = useState("");
  const [currentPrice, setCurrentPrice] = useState(0);
  const [currentRule, setCurrentRule] = useState("");

  const [rendered, setRendered] = useState(false);
  const [renderedRule, setRenderedRule] = useState(false);
  const [nameErrorText, setNameErrorText] = useState("");
  const [descriptionErrorText, setDescriptionErrorText] = useState("");
  const [rulesErrorText, setRulesErrorText] = useState("");
  const [addressErrorText, setAddressErrorText] = useState("");
  const [errorLabelText, setErrorText] = useState("");
  const [singleBedRoomsErrorText, setOneBedRoomsErrorText] = useState("");
  const [doubleBedRoomsErrorText, setDoubleBedRoomsErrorText] = useState("");
  const [fourBedRoomsErrorText, setFourBedRoomsErrorText] = useState("");
  const [lodgePriceErrorText, setLodgePriceErrorText] = useState("");

  useEffect(() => {

    
    axios.get("api/auth/email", {
      params:{
        email:localStorage.getItem(LocalStorageItem.email)
      },
      headers:{
        Accept : 'application/json',
        'Content-type': 'application/json',
        'Authorization':'Bearer ' +  localStorage.getItem(LocalStorageItem.ACCESS_TOKEN)
      }
    }).then((response) => {
      console.log(response.data.id)
      setOwnerId(response.data.id)
    })


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

    var coordinates = [0, 0]
    async function onMapClick(e: any) {
      if (coordinates[0] !== 0) {
        mymap.removeLayer(L.marker([coordinates[0], coordinates[1]]));
      }
      coordinates = e.latlng.toString().substring(7, 25).split(",");
      setLatitude(coordinates[0]);
      setLongitude(coordinates[1]);
      L.marker([coordinates[0], coordinates[1]]).addTo(mymap);
      var data = await (
        await fetch(GEOCODE_URL + `${coordinates[1]},${coordinates[0]}`)
      ).json();
      console.log(data.address);
      setAddress(data.address.Address);
      setAddressErrorText("");
      setCity(data.address.City);
      setCountry(data.address.CountryCode);
    }


  },[]);

  const nameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEntityName(value);
    setNameErrorText("");
    if (!value) {
      return;
    }
  };

  const descriptionChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    setDescription(value);
    setDescriptionErrorText("");
    if (!value) {
      return;
    }
  };

  const rulesChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCurrentRule(value.trim());
    setRulesErrorText("");
    console.log(conductRules);
    if (!value) {
      return;
    }
  };

  const oneBedRoomChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setSingleBedroomNumber(value);
    var roomNumber = Number(value);
    if (roomNumber < 0 || !Number.isInteger(roomNumber)) {
      setOneBedRoomsErrorText("Invalid input!");
    } else {
      setOneBedRoomsErrorText("");
    }
  };

  const doubleBedRoomChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setDoubleBedroomNumber(value);
    var roomNumber = Number(value);
    if (roomNumber < 0 || !Number.isInteger(roomNumber)) {
      setDoubleBedRoomsErrorText("Invalid input!");
    } else {
      setDoubleBedRoomsErrorText("");
    }
  };

  const fourBedRoomChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setFourBedroomNumber(value);
    var roomNumber = Number(value);
    if (roomNumber < 0 || !Number.isInteger(roomNumber)) {
      setFourBedRoomsErrorText("Invalid input!");
    } else {
      setFourBedRoomsErrorText("");
    }
  };

  const lodgePriceChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setLodgePrice(value);
    var price = Number(value);
    if (price < 0) {
      setLodgePriceErrorText("Invalid input!");
    } else {
      setLodgePriceErrorText("");
    }
  };

  const additonalServiceChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setCurrentService(value.trim());
    console.log(additionalServices);
  };

  const additionalServicePriceChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setCurrentPrice(Number(value));
    console.log(additionalServicePrices);
  };

  const isInputValid = () => {
    if (
      nameErrorText ||
      addressErrorText ||
      singleBedRoomsErrorText ||
      doubleBedRoomsErrorText ||
      fourBedRoomsErrorText ||
      descriptionErrorText ||
      rulesErrorText
    ) {
      return false;
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

    if (
      !name ||
      !address ||
      !description ||
      !singleBedroomNumber ||
      !doubleBedroomNumber ||
      !fourBedroomNumber ||
      !conductRules
    ) {
      return false;
    }

    return true;
  };

  const addNewRule = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!renderedRule) {
      const newRules = [];
      if (currentRule.length !== 0) {
        setRenderedRule(true);
        newRules.push(currentRule);
        setConductRules(newRules);
      }
    } else {
      const newRules = [...conductRules];
      if (currentRule.length > 0 && !newRules.includes(currentRule)) {
        newRules.push(currentRule);
        setConductRules(newRules);
      }
    }
  };

  const addNewService = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!rendered) {
      const newPrices = [];
      const newServices = [];
      if (currentService.length !== 0 && currentPrice > 0) {
        setRendered(true);
        newServices.push(currentService);
        newPrices.push(currentPrice);
        setAdditionalServicePrices(newPrices);
        setAdditionalService(newServices);
      }
    } else {
      const newServices = [...additionalServices];
      const newPrices = [...additionalServicePrices];
      if (
        currentPrice > 0 &&
        currentService.length !== 0 &&
        !newServices.includes(currentService)
      ) {
        newServices.push(currentService);
        newPrices.push(currentPrice);
        setAdditionalServicePrices(newPrices);
        setAdditionalService(newServices);
      }
    }
  };

  const removeService =
    (service: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
      const newServices = [...additionalServices];
      const newPrices = [...additionalServicePrices];
      for (let i = 0; i <= newServices.length; i++) {
        if (newServices[i] === service) {
          newServices.splice(i, 1);
          newPrices.splice(i, 1);
        }
      }
      setAdditionalService(newServices);
      setAdditionalServicePrices(newPrices);
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

  const createEntity = async () => {
    if (!isInputValid()) {
      setErrorText("Please fill out required fields correctly.");
    } else {
      setErrorText("");

      var rulesOfConduct = "";
      for (let i = 0; i < conductRules.length; i++) {
        rulesOfConduct += "#";
        rulesOfConduct += conductRules[i];
      }
      const services = [];
      for (let i = 0; i < additionalServices.length; i++) {
        var info = additionalServices[i];
        var price = additionalServicePrices[i];
        services[i] = {
          info,
          price,
        };
      }
      const location = {
        latitude,
        longitude,
        address,
        city,
        country
      }
      const newLodge = {
        ownerId,
        name,
        description,
        rulesOfConduct,
        lodgePrice,
        singleBedroomNumber,
        doubleBedroomNumber,
        fourBedroomNumber,
        services,
        location
      };
      axios
        .post("api/reservationEntity/createLodge", newLodge, {
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
            <SignupError text={nameErrorText} />
            <div className="flex flex-wrap items-center">
              <p className="my-1 w-44 whitespace-nowrap">Address</p>
              <input
                className="input flex-grow md:w-60"
                type="text"
                name="address"
                value={address + ' ' + city}
                disabled
              />
            </div>
            <SignupError text={addressErrorText} />

            <SignupInput
              text="Single-room"
              type="number"
              name="singleBedroomNumber"
              placeholder="Enter room number"
              onChange={oneBedRoomChangeHandler}
            />
            <SignupError text={singleBedRoomsErrorText} />

            <SignupInput
              text="Double-room"
              type="number"
              name="doubleBedroomNumber"
              placeholder="Enter room number"
              onChange={doubleBedRoomChangeHandler}
            />
            <SignupError text={doubleBedRoomsErrorText} />

            <SignupInput
              text="Four-room"
              type="number"
              name="fourBedroomNumber"
              placeholder="Enter room number"
              onChange={fourBedRoomChangeHandler}
            />
            <SignupError text={fourBedRoomsErrorText} />
            <SignupInput
              text="Price"
              type="number"
              name="lodgePrice"
              placeholder="Enter price per day"
              onChange={lodgePriceChangeHandler}
            />
            <SignupError text={lodgePriceErrorText} />
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
          <SignupError text={descriptionErrorText} />
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
              <p className="my-1">Additional services:</p>
              <p className="ml-2 text-gray-500">(optional)</p>
              <input
                className="input resize-none w-52 h-10  mb-4"
                placeholder="Add service name"
                name="additionalServices"
                onChange={additonalServiceChangeHandler}
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
                onClick={addNewService}
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap items-center mb-3">
              <ul>
                {additionalServices.map((d, i) => (
                  <li key={d}>
                    Service name:{d} , Price: {additionalServicePrices[i]}$
                    {!additionalServices.includes("") ? (
                      <button
                        className="btnBlueWhite w-12 h-8 ml-8"
                        onClick={removeService(d)}
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
        </div>
      </div>

      <div className="flex flex-col justify-center my-5">
        <SignupError text={errorLabelText} />
        <button className="btnBlueWhite w-72" onClick={createEntity}>
          Create entity
        </button>
      </div>
    </div>
  );
};

export default ReservationNewEntity;
