import React, { useContext, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import CreateUserDto from "../../dtos/create-user.dto";
import { UserRole } from "../../model/user-role.enum";
import SignupValidation from "../../validations/signup-validation";
import SignupInput from "../signup/SignupInput";
import SignupError from "../signup/SignupErrorLabel";

const ReservationNewEntity = () => {
  const params: { choice: string } = useParams();
  const signupValidation = new SignupValidation();
  const [name, setEntityName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [conductRules, setConductRules] = useState("");
  const [singleBedRooms, setOneBedRooms] = useState("");
  const [doubleBedRooms, setDoubleBedRooms] = useState("");
  const [fourBedRooms, setFourBedRooms] = useState("");
  const [lodgePrice, setLodgePrice] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const [additionalServices, setAdditionalService] = useState([""]);
  const [currentService, setCurrentService] = useState("");

  const [rendered, setRendered] = useState(false);
  const [nameErrorText, setNameErrorText] = useState("");
  const [descriptionErrorText, setDescriptionErrorText] = useState("");
  const [rulesErrorText, setRulesErrorText] = useState("");
  const [addressErrorText, setAddressErrorText] = useState("");
  const [errorLabelText, setErrorText] = useState("");
  const [singleBedRoomsErrorText, setOneBedRoomsErrorText] = useState("");
  const [doubleBedRoomsErrorText, setDoubleBedRoomsErrorText] = useState("");
  const [fourBedRoomsErrorText, setFourBedRoomsErrorText] = useState("");
  const [lodgePriceErrorText, setLodgePriceErrorText] = useState("");
  const [servicePriceErrorText, setServicePriceErrorText] = useState("");

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

  const rulesChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    setConductRules(value);
    setRulesErrorText("");
    if (!value) {
      return;
    }
  };

  const addressChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAddress(value);
    setAddressErrorText("");
    if (!value) {
      return;
    }
  };

  const oneBedRoomChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setOneBedRooms(value);
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
    setDoubleBedRooms(value);
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
    setFourBedRooms(value);
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

  const servicePriceChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setServicePrice(value);
    var price = Number(value);
    if (price < 0) {
      setServicePriceErrorText("Invalid input!");
    } else {
      setServicePriceErrorText("");
    }
  };

  const additonalServiceChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setCurrentService(value);
    console.log(additionalServices);
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

    if (!singleBedRooms) {
      setOneBedRooms("This field is required.");
    }

    if (!doubleBedRooms) {
      setDoubleBedRooms("This field is required.");
    }

    if (!fourBedRooms) {
      setFourBedRooms("This field is required.");
    }

    if (!conductRules) {
      setRulesErrorText("This field is required.");
    }

    if (
      !name ||
      !address ||
      !description ||
      !singleBedRooms ||
      !doubleBedRooms ||
      !fourBedRooms ||
      !conductRules
    ) {
      return false;
    }

    return true;
  };

  const addNewService = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!rendered) {
      const newServices = [];
      setRendered(true);
      if (currentService.length != 0) {
        newServices.push(currentService);
        setAdditionalService(newServices);
      }
    } else {
      const newServices = [...additionalServices];
      if (currentService.length != 0 && !newServices.includes(currentService)) {
        newServices.push(currentService);
        setAdditionalService(newServices);
      }
    }
  };

  const removeService =
    (service: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
      const newServices = [...additionalServices];
      for (let i = 0; i <= newServices.length; i++) {
        if (newServices[i] == service) {
          newServices.splice(i, 1);
        }
      }
      setAdditionalService(newServices);
    };

  const createEntity = async () => {
    if (!isInputValid()) {
      setErrorText("Please fill out required fields correctly.");
    } else {
      setErrorText("");
    }
  };

  return (
    <div className="flex flex-col flex-grow bg-gray-100 items-center p-5">
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

            <SignupInput
              type="text"
              text="Address:"
              name="address"
              placeholder="address"
              onChange={addressChangeHandler}
            />
            <SignupError text={addressErrorText} />

            <div className="flex flex-wrap mt-4 items-center mb-3">
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
            <SignupInput
              text="Single-room"
              type="number"
              name="oneBedRooms"
              placeholder="Enter room number"
              onChange={oneBedRoomChangeHandler}
            />
            <SignupError text={singleBedRoomsErrorText} />

            <SignupInput
              text="Double-room"
              type="number"
              name="doubleBedRooms"
              placeholder="Enter room number"
              onChange={doubleBedRoomChangeHandler}
            />
            <SignupError text={doubleBedRoomsErrorText} />

            <SignupInput
              text="Four-room"
              type="number"
              name="fourBedRooms"
              placeholder="Enter room number"
              onChange={fourBedRoomChangeHandler}
            />
            <SignupError text={fourBedRoomsErrorText} />
            <SignupInput
              text="Price"
              type="number"
              name="lodgePrice"
              placeholder="Enter price per person"
              onChange={lodgePriceChangeHandler}
            />
            <SignupError text={lodgePriceErrorText} />

            <SignupInput
              text="Service price"
              type="number"
              name="servicePrice"
              placeholder="Enter service price"
              onChange={servicePriceChangeHandler}
            />
            <SignupError text={servicePriceErrorText} />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex flex-col -mt-8 flex-grow text-lg px-8 py-6 md:w-500px">
            <div className="flex flex-wrap items-center mb-3">
              <p className="my-1">Rules of conduct:</p>
              <p className="ml-2 text-gray-500"></p>
              <textarea
                className="input resize-none w-full h-40"
                maxLength={150}
                placeholder="List rules of conduct"
                name="conductRules"
                onChange={rulesChangeHandler}
              />
            </div>
            <div className="flex flex-wrap items-center mb-3">
              <p className="my-1">Additional services:</p>
              <p className="ml-2 text-gray-500">(optional)</p>
              <input
                className="input resize-none w-72 h-10"
                placeholder="Add new service"
                name="additionalService"
                onChange={additonalServiceChangeHandler}
              />
              <button
                className="btnBlueWhite w-16 ml-8"
                onClick={addNewService}
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap items-center mb-3">
              <ul>
                {additionalServices.map((d) => (
                  <li key={d}>
                    {d}
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
