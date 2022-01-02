import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import LocalStorageUtil from "../../utils/local-storage-util";

const ReservationEntityDisplay = () => {
  const authContext = useContext(AuthContext);
  const params: { id: string } = useParams();
  const userRole = authContext.userRole;

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [additionalService, setAdditionalService] = useState([""]);

  const [currentService, setCurrentService] = useState("");
  const [rendered, setRendered] = useState(false);

	const nameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setName(value);
	};

	const addresChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setAddress(value);
	};

	const descriptionChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		const value = event.target.value;
		setDescription(value);
	};

  const additionalServiceChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setCurrentService(value);
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
      const newServices = [...additionalService];
      if (currentService.length != 0 && !newServices.includes(currentService)) {
        newServices.push(currentService);
        setAdditionalService(newServices);
      }
    }
  };

  const removeService =
    (service: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
      const newServices = [...additionalService];
      for (let i = 0; i <= newServices.length; i++) {
        if (newServices[i] == service) {
          newServices.splice(i, 1);
        }
      }
      setAdditionalService(newServices);
    };

  const changeEntity = () => {
    console.log(userRole);
  };
  return (
    <div>
      <div>
        <nav className="flex flex-col bg-blue-500 w-64 float-left h-screen px-4 tex-gray-900 border border-blue-900">
          <div className="mt-10 mb-4">
            <ul className="ml-4">
              <Link to={"/reservationEntities/" + params.id}>
                <li
                  className="mb-2 px-4 py-4 text-black-100 flex flex-row bg-gray-300 border-gray-300 hover:text-black   
            hover:bg-gray-300  hover:font-bold rounded rounded-lg"
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9" />
                      <path d="M9 22V12h6v10M2 10.6L12 2l10 8.6" />
                    </svg>
                  </span>

									<span className='ml-2'>Home</span>
								</li>
							</Link>

              <Link to={"/reservationEntitiesImages/" + params.id}>
                <li className="mb-2 px-4 py-4 text-gray-100 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded rounded-lg">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="M20.4 14.5L16 10 4 20" />
                    </svg>
                  </span>
                  <span className="ml-2">Images</span>
                </li>
              </Link>
              <Link to={"/reservationEntitiesAction/" + params.id}>
                <li className="mb-2 px-4 py-4 text-gray-100 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded rounded-lg">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="3"
                        y="4"
                        width="18"
                        height="18"
                        rx="2"
                        ry="2"
                      ></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                  </span>
                  <span className="ml-2">Quick reservation</span>
                </li>
              </Link>
              <Link to={"/reservationEntitiesPricelist/" + params.id}>
                <li className="mb-2 px-4 py-4 text-gray-100 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded rounded-lg">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="12" y1="1" x2="12" y2="23"></line>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                  </span>
                  <span className="ml-2">Pricelist</span>
                </li>
              </Link>

              <Link to={"/reservationEntitiesRules/" + params.id}>
                <li className="mb-2 px-4 py-4 text-gray-100 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded rounded-lg">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                  </span>
                  <span className="ml-2">Conduct rules</span>
                </li>
              </Link>
            </ul>
          </div>
        </nav>
      </div>
      <div className="w-full mt-12 mx-auto max-w-xl">
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Full Name
            </label>
          </div>
          <div className="md:w-2/3">
            {userRole == "LODGE_OWNER" ? (
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                id="inline-full-name"
                type="text"
                name="name"
                onChange={nameChangeHandler}
              ></input>
            ) : (
              <input
                disabled
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                id="inline-full-name"
                type="text"
                name="name"
              ></input>
            )}
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Address
            </label>
          </div>
          <div className="md:w-2/3">
            {userRole == "LODGE_OWNER" ? (
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                id="inline-password"
                name="address"
                onChange={addresChangeHandler}
              />
            ) : (
              <input
                disabled
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                id="inline-password"
                name="address"
              />
            )}
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right ml-32 mb-1 md:mb-0 pr-4">
              Select rooms
            </label>
          </div>
          <select className="block appearance-none w-full bg-white border ml-2 border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
            <option>Single room</option>
            <option>Double room</option>
            <option>Four-bed room</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right ml-24 mb-1 md:mb-0 pr-4">
              Promo description
            </label>
          </div>
          {userRole == "LODGE_OWNER" ? (
            <textarea
              name="description"
              onChange={descriptionChangeHandler}
              className="block readonly appearance-none w-full bg-white border  border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            />
          ) : (
            <textarea
              disabled
              name="description"
              className="block readonly appearance-none w-full bg-white border  border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            />
          )}

          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 ">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right ml-24 mb-1 md:mb-0 pr-4">
              Additional service
            </label>
          </div>
          <input
            onChange={additionalServiceChangeHandler}
            name="additionalService"
            className="block readonly appearance-none w-full bg-white border  border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline readonly"
          ></input>
          {userRole == "LODGE_OWNER" ? (
            <button className="btnBlueWhite w-16 ml-8" onClick={addNewService}>
              Add
            </button>
          ) : (
            <div></div>
          )}

          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        <div className="md:flex md:items-center mb-6 ml-52">
          <ul>
            {additionalService.map((d) => (
              <li key={d}>
                {d}
                {!additionalService.includes("") ? (
                  userRole == "LODGE_OWNER" ? (
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
                  )
                ) : (
                  <div></div>
                )}
              </li>
            ))}
          </ul>
        </div>
        {userRole == "LODGE_OWNER" ? (
          <div>
            <button className="btnBlueWhite w-72 ml-60" onClick={changeEntity}>
              Submit changes
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default ReservationEntityDisplay;
