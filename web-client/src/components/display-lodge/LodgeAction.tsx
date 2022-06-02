import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { HttpStatusCode } from "../../utils/http-status-code.enum";
import { LocalStorageItem } from "../../utils/local-storage/local-storage-item.enum";
import DatePicker from "../common/DatePicker";
import AuthContext from "../../context/auth-context";
import { UserRole } from "../../model/user-role.enum";
import { format } from "date-fns";

const LodgeAction = () => {
  const params: { id: string } = useParams();
  const authContext = useContext(AuthContext);
  const userRole = authContext.user.role;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [maxPersonNumber, setMaxPersonNumber] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [personNumber, setPersonNumber] = useState(0);
  const [regularService, setRegularService] = useState({
    id: 0,
    info: "",
    price: 0,
    type: "",
  });
  const [services, setServices] = useState([
    {
      id: 0,
      info: "",
      price: 0,
      type: "",
    },
  ]);

  const [regularServices, setRegularServices] = useState([
    { id: 0, info: "", price: 0, type: "" },
  ]);
  const [additionalServices, setAdditionalServices] = useState([
    { id: 0, type: "", info: "", price: 0 },
  ]);
  const [reservations, setReservations] = useState([
    {
      startDate,
      endDate,
      maxPersonNumber,
      price: 0,
      discount,
      services,
    },
  ]);

  useEffect(() => {
    axios
      .get("/api/lodge/" + params.id, {
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization:
            "Bearer " + localStorage.getItem(LocalStorageItem.ACCESS_TOKEN),
        },
      })
      .then((response) => {
        var singleRooms = response.data.singleBedroomNumber;
        var doubleRooms = response.data.doubleBedroomNumber * 2;
        var fourRooms = response.data.fourBedroomNumber * 4;
        setMaxPersonNumber(singleRooms + doubleRooms + fourRooms);
        setPersonNumber(singleRooms + doubleRooms + fourRooms);
        setLodgeServices(response.data.services);
        setServices([]);
      });

    axios
      .get("/api/reservation/openReservations/" + params.id, {
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization:
            "Bearer " + localStorage.getItem(LocalStorageItem.ACCESS_TOKEN),
        },
      })
      .then((response) => {
        console.log(response.data);
        setReservations(response.data);
      });
  }, []);

  const getReservations = reservations.map((reservation) => (
    <tr className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
      <td className="px-6 py-4">
        {format(reservation.startDate, "dd.MM.yyyy.")}
      </td>
      <td className="px-6 py-4">
        {format(reservation.endDate, "dd.MM.yyyy.")}
      </td>
      <td className="px-6 py-4">
        {reservation.services.map((service) => {
          return service.type === "REGULAR" ? service.info : " ";
        })}
      </td>
      <td className="px-6 py-4">
        {reservation.services.map((service) => {
          return service.type === "ADDITIONAL" ? service.info + " " : " ";
        })}
      </td>
      <td className="px-6 py-4">{reservation.discount} %</td>
      <td className="px-6 py-4">{reservation.price} $</td>
      <td className="px-6 py-4">{reservation.maxPersonNumber}</td>
      <td className="px-6 py-4 text-right">
        <a
          href="#"
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Reserve
        </a>
      </td>
    </tr>
  ));

  const setLodgeServices = (
    services: [{ id: number; info: string; price: number; type: string }]
  ) => {
    var newRegularServices = [];
    var newAdditionalServices = [];
    for (let i = 0; i < services.length; i++) {
      if (services[i].type === "REGULAR") {
        newRegularServices.push(services[i]);
      } else {
        newAdditionalServices.push(services[i]);
      }
    }
    console.log(newRegularServices[newRegularServices.length - 1]);
    setRegularService(newRegularServices[newRegularServices.length - 1]);

    setRegularServices(newRegularServices);
    setAdditionalServices(newAdditionalServices);
  };

  const additionalServiceChangeHandler = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    var ids = Array.from(e.target.selectedOptions, (option) => option.value);
    var newAdditionalServices = [];
    for (let i = 0; i < ids.length; i++) {
      for (let j = 0; j < additionalServices.length; j++) {
        if (additionalServices[j].id === Number(ids[i])) {
          newAdditionalServices.push(additionalServices[j]);
        }
      }
    }
    console.log(newAdditionalServices);
    setServices(newAdditionalServices);
  };

  const regularServiceChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    var info = event.target.value;
    setRegularService({
      id: 0,
      info: "",
      price: 0,
      type: "",
    });
    for (let i = 0; i < regularServices.length; i++) {
      if (regularServices[i].info === info) {
        setRegularService(regularServices[i]);
        break;
      }
    }
  };

  const discountChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setDiscount(Number(value));
  };

  const personNumberChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setPersonNumber(Number(value));
  };

  const checkConditions = () => {
    if (startDate >= endDate || startDate <= new Date()) {
      window.alert("Bad dates!");
      return false;
    }
    if (maxPersonNumber === 0) {
      window.alert("Person number is empty!");
      return false;
    }
    return true;
  };

  const createReservation = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (checkConditions()) {
      var days = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
      var price = 0;
      console.log(regularService);
      services.push(regularService);
      for (let i = 0; i < services.length; i++) {
        price += services[i].price * days * personNumber;
      }
      price = price * (1 - discount / 100);

      var maxPersonNumber = personNumber;
      const reservation = {
        startDate,
        endDate,
        maxPersonNumber,
        discount,
        price,
        services,
        reservationEntityId: params.id,
      };
      console.log(reservation);
      axios
        .post("/api/reservation/createReservation", reservation, {
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            Authorization:
              "Bearer " + localStorage.getItem(LocalStorageItem.ACCESS_TOKEN),
          },
        })
        .then((response) => {
          if (response.status == HttpStatusCode.CREATED) {
            window.alert("Action successfully created!");
            window.location.reload();
          }
        })
        .catch((error) => {
          if (error.status == HttpStatusCode.NOT_ACCEPTABLE) {
            window.alert("There are no free periods for this action!");
          }
        });
    }
  };

  return (
    <div>
      <div>
        <nav className="flex flex-col bg-blue-500 w-64 float-left h-screen px-4 tex-gray-900 border border-blue-900">
          <div className="mt-10 mb-4">
            <ul className="ml-4">
              <Link to={"/lodge/" + params.id}>
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

              <Link to={"/lodgeImages/" + params.id}>
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
              <Link to={"/lodgePricelist/" + params.id}>
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

              <Link to={"/lodgeRules/" + params.id}>
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
              <Link to={"/lodgeCalendar/" + params.id}>
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
                  <span className="ml-2">Calendar</span>
                </li>
              </Link>
            </ul>
          </div>
        </nav>
      </div>
      {userRole === UserRole.LODGE_OWNER ? (
        <div className="w-full mt-12 mx-auto max-w-xl">
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                Action start date
              </label>
            </div>
            <div className="md:w-2/3">
              <DatePicker
                value={startDate}
                onValueChange={function (d: Date): void {
                  setStartDate(d);
                }}
              ></DatePicker>
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                Action end date
              </label>
            </div>
            <div className="md:w-2/3">
              <DatePicker
                value={endDate}
                onValueChange={function (d: Date): void {
                  setEndDate(d);
                }}
              ></DatePicker>
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
                max={maxPersonNumber}
                value={personNumber}
                name="personNumber"
                onChange={personNumberChangeHandler}
              ></input>
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right ml-24 mb-1 md:mb-0 pr-4">
                Regular service
              </label>
            </div>
            <div className="inline-block relative md:w-2/3">
              <select
                onChange={regularServiceChangeHandler}
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              >
                {regularServices.map((newService) => (
                  <option key={newService.id} value={newService.info} selected>
                    {newService.info}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right ml-24 mb-1 md:mb-0 pr-4">
                Additional services
              </label>
            </div>
            <div className="inline-block relative md:w-2/3">
              <select
                multiple
                onChange={(e) => additionalServiceChangeHandler(e)}
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              >
                {additionalServices.map((newService) => (
                  <option key={newService.id} value={newService.id}>
                    {newService.info}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                Discount
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                id="inline-full-name"
                type="number"
                min="0"
                max="100"
                name="discount"
                value={discount}
                onChange={discountChangeHandler}
              ></input>
            </div>
          </div>

          <button
            className="btnBlueWhite w-72 ml-60"
            onClick={createReservation}
          >
            Add quick reservation
          </button>
        </div>
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Start date
                </th>
                <th scope="col" className="px-6 py-3">
                  End date
                </th>
                <th scope="col" className="px-6 py-3">
                  Regular service
                </th>
                <th scope="col" className="px-6 py-3">
                  Additional services
                </th>
                <th scope="col" className="px-6 py-3">
                  Discount
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Person number
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Reserve</span>
                </th>
              </tr>
            </thead>
            <tbody>{getReservations}</tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LodgeAction;
