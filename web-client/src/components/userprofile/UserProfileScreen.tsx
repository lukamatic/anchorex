import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import LeftArrow from "../../icons/LeftArrow";
import { LocalStorageItem } from "../../utils/local-storage/local-storage-item.enum";
import TextInput from "../common/TextInput";

const UserProfileScreen = () => {
  const params: { id: string } = useParams();
  const history = useHistory();

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    country: "",
    phoneNumber: "",
  });

  const goBack = () => {
    history.goBack();
  };

  useEffect(() => {
    axios
      .get("/api/users/" + params.id, {
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization:
            "Bearer " + localStorage.getItem(LocalStorageItem.ACCESS_TOKEN),
        },
      })
      .then((response) => {
        setUserData(response.data);
      });
  }, []);

  return (
    <div className="flex ">
      <div className="mt-20  max-w-6xl p-12 bg-blue-200 mx-auto rounded-xl shadow-md relative">
        <div className="mb-5 flex flex-row">
          <button
            className="flex flex-row items-center px-3 pt-1 w-28"
            onClick={goBack}
          >
            <LeftArrow className="" />
            <span className="ml-1">Back</span>
          </button>
          <h1 className="text-4xl mr-2">User profile</h1>
        </div>
        <div className="flex flex-row ">
          <div className="flex flex-col flex-grow text-lg px-8 pt-5 ">
            <TextInput
              type="text"
              value={userData.firstName}
              text="First name:"
              name="firstName"
              placeholder="first name"
              onChange={(e: any) => {
                console.log(e);
              }}
              disabled={true}
            />

            <TextInput
              type="text"
              value={userData.lastName}
              text="Last name:"
              name="lastName"
              placeholder="last name"
              disabled={true}
              onChange={undefined}
            />

            <TextInput
              type="email"
              value={userData.email}
              text="Email:"
              name="email"
              placeholder="email"
              onChange={undefined}
              disabled={true}
            />

            <TextInput
              type="text"
              value={userData.address}
              text="Address:"
              name="address"
              placeholder="address"
              onChange={undefined}
              disabled={true}
            />

            <TextInput
              type="text"
              text="City:"
              value={userData.city}
              name="city"
              placeholder="city"
              onChange={undefined}
              disabled={true}
            />

            <TextInput
              type="text"
              text="Country:"
              value={userData.country}
              name="country"
              placeholder="country"
              onChange={undefined}
              disabled={true}
            />

            <TextInput
              type="tel"
              text="Phone number:"
              value={userData.phoneNumber}
              name="phoneNumber"
              placeholder="phone number"
              onChange={undefined}
              disabled={true}
            />
          </div>
          <div className="flex flex-col items-center">
            <div className="flex flex-col flex-grow text-lg px-8 pt-5">
              <div className="flex flex-wrap  mb-3 ">
                <p className="my-1">About me:</p>
                <p className="ml-2 text-gray-500">(optional)</p>
                <textarea
                  className="input resize-none w-full h-40"
                  maxLength={150}
                  placeholder="Say something about yourself"
                  disabled={true}
                  onChange={undefined}
                />
              </div>
              <div className=" bg-white  shadow-md rounded-md w-72 border-4 border-blue-200 flex flex-col top-8 p-8">
                <div>
                  <p className="text-3xl text-gray-500">Loyalty program</p>
                  <p className="text-xl text-gray-500 text-bold">GOLD</p>
                </div>
                <div>
                  <p className="text-2xl text-gray-500">Points</p>
                  <p className="text-xl text-gray-500 text-bold">30</p>
                </div>
              </div>
              <div className="flex-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileScreen;
