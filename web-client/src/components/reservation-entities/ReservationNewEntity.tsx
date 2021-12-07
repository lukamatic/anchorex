import { useContext, useState } from "react";
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
  const [oneBedRooms, setOneBedRooms] = useState("");
  const [doubleBedRooms, setDoubleBedRooms] = useState("");
  const [fourBedRooms, setFourBedRooms] = useState("");

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
    if (Number(value) < 0) {
      setOneBedRoomsErrorText("Invalid input!");
    } else {
      setOneBedRoomsErrorText("");
    }
    if (!value) {
      return;
    }
  };

  const doubleBedRoomChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setDoubleBedRooms(value);
    if (Number(value) < 0) {
      setDoubleBedRoomsErrorText("Invalid input!");
    } else {
      setDoubleBedRoomsErrorText("");
    }
    if (!value) {
      return;
    }
  };

  const fourBedRoomChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setFourBedRooms(value);
    if (Number(value) < 0) {
      setFourBedRoomsErrorText("Invalid input!");
    } else {
      setFourBedRoomsErrorText("");
    }
    if (!value) {
      return;
    }
  };

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

    if (!oneBedRooms) {
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
      !oneBedRooms ||
      !doubleBedRooms ||
      !fourBedRooms ||
      !conductRules
    ) {
      return false;
    }

    return true;
  };

  const createAccount = async () => {
    if((!isInputValid())){
      setErrorText('Please fill out required fields correctly.');
    }
  };

  return (
    <div className="flex flex-col flex-grow bg-gray-100 items-center p-5">
      <div className="flex flex-row justify-center flex-wrap shadow-lg lg:mt-16 bg-white">
        <div className="flex flex-col items-center">
          <div className="flex flex-col flex-grow text-lg px-8 pt-5 md:w-500px">
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

            <div className="flex flex-wrap items-center mb-3">
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
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex flex-col flex-grow text-lg px-8 py-6 md:w-500px">
            <SignupInput
              text="One-room"
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
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center my-5">
        <SignupError text={errorLabelText} />
        <button className="btnBlueWhite w-72" onClick={createAccount}>
          Create account
        </button>
      </div>
    </div>
  );
};

export default ReservationNewEntity;
