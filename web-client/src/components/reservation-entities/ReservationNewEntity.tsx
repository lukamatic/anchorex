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
  const [additionalService, setAdditionalService] = useState("");

  const[singleBedRoomsFullAcc, setSingleBedRoomsFullAcc] = useState("")
  const[doubleBedRoomsFullAcc, setDoubleBedRoomsFullAcc] = useState("")
  const[fourBedRoomsFullAcc, setFourBedRoomsFullAcc] = useState("")

  const[singleBedRoomsSemiAcc, setSingleBedRoomsSemiAcc] = useState("")
  const[doubleBedRoomsSemiAcc, setDoubleBedRoomsSemiAcc] = useState("")
  const[fourBedRoomsSemiAcc, setFourBedRoomsSemiAcc] = useState("")

  const[singleBedRoomsBB, setSingleBedRoomsBB] = useState("")
  const[doubleBedRoomsBB, setDoubleBedRoomsBB] = useState("")
  const[fourBedRoomsBB, setFourBedRoomsBB] = useState("")
  

  const [nameErrorText, setNameErrorText] = useState("");
  const [descriptionErrorText, setDescriptionErrorText] = useState("");
  const [rulesErrorText, setRulesErrorText] = useState("");
  const [addressErrorText, setAddressErrorText] = useState("");
  const [errorLabelText, setErrorText] = useState("");
  const [oneBedRoomsErrorText, setOneBedRoomsErrorText] = useState("");
  const [doubleBedRoomsErrorText, setDoubleBedRoomsErrorText] = useState("");
  const [fourBedRoomsErrorText, setFourBedRoomsErrorText] = useState("");

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

  const additonalServiceChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    setAdditionalService(value);
  };

  const singleBedRoomsFullAccChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setSingleBedRoomsFullAcc(value)
  }

  const doubleBedRoomFullAccChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setDoubleBedRoomsFullAcc(value)
  }

  const fourBedRoomFullAccChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setFourBedRoomsFullAcc(value)
  }

  const singleBedRoomsSemiAccChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setSingleBedRoomsSemiAcc(value)
  }

  const doubleBedRoomSemiAccChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setDoubleBedRoomsSemiAcc(value)
  }

  const fourBedRoomSemiAccChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setFourBedRoomsSemiAcc(value)
  }

  const singleBedRoomsBBChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setSingleBedRoomsBB(value)
  }

  const doubleBedRoomBBChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setDoubleBedRoomsBB(value)
  }

  const fourBedRoomBBChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setFourBedRoomsBB(value)
  }

  const isInputValid = () => {
    if (
      nameErrorText ||
      addressErrorText ||
      oneBedRoomsErrorText ||
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
            <SignupError text={oneBedRoomsErrorText} />

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

            <div className="flex flex-wrap items-center">
              <p className="my-1 w-44 whitespace-nowrap space-x-28">
                <label>Room type</label>
                <label>Full accomodation</label>
                <label>Semi accomodation</label>
                <label>BB</label>
              </p>
            </div>

            <div className="flex flex-wrap items-center">
              <p className="my-1 w-44 whitespace-nowrap space-x-16">
                <label>Single-bed room</label>
                <input
                  className="input flex-grow md:w-44"
                  type="number"
                  placeholder="Price per day ($)"
                  min="1"
                  step="1"
                  onChange={singleBedRoomsFullAccChangeHandler}
                  
                />
                <input
                  className="input flex-grow md:w-44"
                  type="number"
                  placeholder="Price per day ($)"
                  min="1"
                  step="1"
                  onChange={singleBedRoomsSemiAccChangeHandler}
                />
                <input
                  className="input flex-grow md:w-44"
                  type="number"
                  placeholder="Price per day ($)"
                  min="1"
                  step="1"
                  onChange={singleBedRoomsBBChangeHandler}
                />
              </p>
            </div>
            <div className="flex flex-wrap items-center">
              <p className="my-1 w-44 whitespace-nowrap space-x-16">
                <label>Double-bed room</label>
                <input
                  className="input flex-grow md:w-44"
                  type="number"
                  placeholder="Price per day ($)"
                  min="1"
                  step="1"
                  onChange={doubleBedRoomFullAccChangeHandler}
                />
                <input
                  className="input flex-grow md:w-44"
                  type="number"
                  placeholder="Price per day ($)"
                  min="1"
                  step="1"
                  onChange={doubleBedRoomSemiAccChangeHandler}
                />
                <input
                  className="input flex-grow md:w-44"
                  type="number"
                  placeholder="Price per day ($)"
                  min="1"
                  step="1"
                  onChange={doubleBedRoomBBChangeHandler}
                />
              </p>
            </div>
            <div className="flex flex-wrap items-center">
              <p className="my-1 w-44 whitespace-nowrap space-x-16">
                <label>Four-bed room</label>
                <input
                  className="input flex-grow md:w-44"
                  type="number"
                  placeholder="Price per day ($)"
                  min="1"
                  step="1"
                  onChange={fourBedRoomFullAccChangeHandler}
                />
                <input
                  className="input flex-grow md:w-44"
                  type="number"
                  placeholder="Price per day ($)"
                  min="1"
                  step="1"
                  onChange={fourBedRoomSemiAccChangeHandler}
                />
                <input
                  className="input flex-grow md:w-44"
                  type="number"
                  placeholder="Price per day ($)"
                  min="1"
                  step="1"
                  onChange={fourBedRoomBBChangeHandler}
                />
              </p>
            </div>
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
              <textarea
                className="input resize-none w-full h-40"
                maxLength={150}
                placeholder="Say something about yourself"
                name="additionalService"
                onChange={additonalServiceChangeHandler}
              />
            </div>
            <div className='flex flex-wrap items-center'>
            <form action="/action_page.php" >
            <input type="file" name="image" accept="image/*"/>
            </form>
            </div>
            
            
            <SignupError text={rulesErrorText} />
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
