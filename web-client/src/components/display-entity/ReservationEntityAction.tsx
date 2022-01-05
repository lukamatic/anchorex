import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AuthContext from "../../context/auth-context";

const ReservationEntityAction = () => {
    const authContext = useContext(AuthContext);
    const params: { id: string } = useParams();
  
    const [actionStartDate, setActionStartDate] = useState("");
    const [actionEndDate, setActionEndDate] = useState("");
    const [price, setPrice] = useState("");
    const [personNumber, setPersonNumber] = useState("");
    const [additionalService, setAdditionalService] = useState("");
  
    const actionStartDateChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setActionStartDate(value);
    };
  
    const actionEndDateChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setActionEndDate(value);
    };
  
    const priceChangeHandler = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const value = event.target.value;
      setPrice(value);
    };

    const personNumberChangeHandler = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const value = event.target.value;
      setPersonNumber(value);
    }
  
    const additionalServiceChangeHandler = (
      event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      const value = event.target.value;
      setAdditionalService(value);
    };
    return (
      <div>
        <div>
          <nav className="flex flex-col bg-blue-500 w-64 float-left h-screen px-4 tex-gray-900 border border-blue-900">
            <div className="mt-10 mb-4">
              <ul className="ml-4">
                <Link to={"/reservationEntities/" + params.id}>
                  <li
                    className="mb-2 px-4 py-4 text-gray-100 flex flex-row  border-gray-300 hover:text-black   
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
  
                    <span className="ml-2">Home</span>
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
                <li className="mb-2 px-4 py-4 text-black-100 bg-gray-300 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded rounded-lg">
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
                Action start date
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                id="inline-full-name"
                type="date"
                name="actionStartDate"
                onChange={actionStartDateChangeHandler}
              ></input>
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                Action end date
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                id="inline-password"
                name="actionEndDate"
                type="date"
                onChange={actionEndDateChangeHandler}
              />
            </div>
          </div>
         
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right ml-24 mb-1 md:mb-0 pr-4">
                Max person number
              </label>
            </div>
            <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              id="inline-full-name"
              type="number"
              min="1"
              step="1"
              name="personNumber"
              onChange={personNumberChangeHandler}
            ></input>
          </div>
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
                Additional service
              </label>
            </div>
            <textarea
              onChange={additionalServiceChangeHandler}
              name="additionalService"
              className="block readonly appearance-none w-full bg-white border  border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline readonly"
            ></textarea>
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
          <div>
          <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Price
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              id="inline-full-name"
              type="number"
              min="1.00"
              name="price"
              onChange={priceChangeHandler}
            ></input>
          </div>
        </div>
          <button className="btnBlueWhite w-72 ml-60">
            Add quick reservation
          </button>
          </div>
        </div>
      </div>
    );
  };


export default ReservationEntityAction