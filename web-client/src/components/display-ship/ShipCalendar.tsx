import axios from "axios";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { LocalStorageItem } from "../../utils/local-storage/local-storage-item.enum";

const ShipCalendar = () => {
  const params: { id: string } = useParams();

  const [startDate, setStartDate] = useState(new Date);
  const [endDate, setEndDate] = useState(new Date);

  const startDateChangeHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setStartDate(new Date(value));
  }

  const endDateChangeHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEndDate(new Date(value))
  }

  const addNewFreePeriod = (event:React.MouseEvent<HTMLButtonElement>) => {
    if(startDate >= endDate || endDate <= new Date()){
        window.alert('Dates were not entered properly! Change them.');
    }
    else{
        const freePeriod = {
            startDate,
            endDate
        }
        axios.post("/api/ship/addFreePeriod/" + params.id, freePeriod,{
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            Authorization:
              "Bearer " + localStorage.getItem(LocalStorageItem.ACCESS_TOKEN),
          },
        })
        .then((response) => {
            window.alert('evo me')
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  }
  return (
    <div>
      <div>
        <nav className="flex flex-col bg-blue-500 w-64 float-left h-screen px-4 tex-gray-900 border border-blue-900">
          <div className="mt-10 mb-4">
          <ul className="ml-4">
              <Link to={"/ship/" + params.id}>
                <li
                className="mb-2 px-4 py-4 text-gray-100 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded rounded-lg"
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

              <Link to={"/shipImages/" + params.id}>
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
              <Link to={"/shipAction/" + params.id}>
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
              <Link to={"/shipPricelist/" + params.id}>
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

              <Link to={"/shipRules/" + params.id}>
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
              <Link to={"/shipKit/" + params.id}>
                <li className="mb-2 px-4 py-4 text-gray-100 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded rounded-lg">
                  <svg
                    version="1.0"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    fill="#FFFFFF"
                    width="24px"
                    height="24px"
                    viewBox="0 0 100 100"
                    enableBackground="new 0 0 100 100"
                    xmlSpace="preserve"
                  >
                    <path
                      d="M60,10.001c-7.363,0-13.333,5.97-13.333,13.333c0,6.204,4.258,11.373,10,12.861v35.471c0,6.445-5.225,11.666-11.667,11.666
	c-6.445,0-11.667-5.221-11.667-11.666v-3.334H40L26.667,48.334v23.332c0,10.13,8.209,18.333,18.333,18.333
	s18.333-8.203,18.333-18.333V36.195c5.739-1.488,10-6.657,10-12.861C73.333,15.971,67.363,10.001,60,10.001z M60,30
	c-3.682,0-6.667-2.984-6.667-6.666s2.985-6.667,6.667-6.667s6.667,2.985,6.667,6.667S63.682,30,60,30z"
                    />
                  </svg>

                  <span className="ml-2">Ship kit</span>
                </li>
              </Link>
              <Link to={"/shipCalendar/" + params.id}>
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
                  <span className="ml-2">Calendar</span>
                </li>
              </Link>
            </ul>
          </div>
        </nav>
      </div>
      <div className="w-full mt-12 mx-auto max-w-xl">
        <h2 className="text-xl font-bold leading-7 text-gray-900 mb-8 sm:text-3xl sm:truncate">
          Free period
        </h2>
        <form className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Start Date
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="date"
                onChange={startDateChangeHandler}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                End Date
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="date"
                onChange={endDateChangeHandler}
              />
            </div>
            <button
              className="mt-6 ml-48 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={addNewFreePeriod}
            >
              Add new period
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShipCalendar;
