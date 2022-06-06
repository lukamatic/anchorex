import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HttpStatusCode } from "../../utils/http-status-code.enum";
import { LocalStorageItem } from "../../utils/local-storage/local-storage-item.enum";

const ReservationHistory = () => {
  const [showModal, setShowModal] = useState(false);
  const [clientShowedUp, setClientShowUp] = useState(true);
  const [penaltySuggestion, setPenaltySuggestion] = useState(false);
  const [comment, setComment] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [clientId, setClientId] = useState(0);
  const [services, setServices] = useState([
    {
      id: 0,
      info: "",
      price: 0,
      type: "",
    },
  ]);

  const [reservations, setReservations] = useState([
    {
      startDate,
      endDate,
      maxPersonNumber: 0,
      price: 0,
      discount: 0,
      services,
      userId: 0,
      userFullname: "",
      ownerId: 0,
    },
  ]);

  useEffect(() => {
    axios
      .get(
        "/api/reservation/closedReservations?email=" +
          localStorage.getItem(LocalStorageItem.EMAIL),
        {
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            Authorization:
              "Bearer " + localStorage.getItem(LocalStorageItem.ACCESS_TOKEN),
          },
        }
      )
      .then((response) => {
        setReservations(response.data);
      });
  }, []);

  const onClientShowUpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!clientShowedUp) {
      setClientShowUp(true);
    } else {
      setClientShowUp(false);
    }
  };

  const onPenaltySuggestionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!penaltySuggestion) {
      setPenaltySuggestion(true);
    } else {
      setPenaltySuggestion(false);
    }
  };

  const onCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setComment(value);
    if (!value) {
      return;
    }
  };

  const createReport = (event: React.MouseEvent<HTMLButtonElement>) => {
    const report = {
      penaltySuggestion,
      clientShowedUp,
      comment,
      clientId,
    };
    axios
      .post(
        "/api/reservation/report?email=" +
          localStorage.getItem(LocalStorageItem.EMAIL),
        report,
        {
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            Authorization:
              "Bearer " + localStorage.getItem(LocalStorageItem.ACCESS_TOKEN),
          },
        }
      )
      .then((response) => {
        if (response.status == HttpStatusCode.CREATED) {
          window.alert("Report successfully sent!");
          window.location.reload();
        }
      });
  };

  const getReservations = reservations.map((reservation) => (
    <tr className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
      <td className="px-6 py-4">
        <Link to={"/userProfile/" + reservation.userId}>
          {reservation.userFullname}
        </Link>
      </td>
      <td className="px-6 py-4">
        {reservation.startDate.toString().slice(0, 10)}
      </td>
      <td className="px-6 py-4">
        {reservation.endDate.toString().slice(0, 10)}
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
      <td className="px-6 py-4">{reservation.discount}%</td>
      <td className="px-6 py-4">{reservation.price}$</td>
      <td className="px-6 py-4">{reservation.maxPersonNumber}</td>
      <td className="px-6 py-4">
        <button
          type="button"
          className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          onClick={function (): void {
            if (new Date(reservation.endDate) <= new Date()) {
              setClientId(reservation.userId);
              setShowModal(true);
            }
          }}
          data-bs-toggle="modal"
          data-bs-target="#exampleModalScrollable"
        >
          Send report
        </button>
      </td>
    </tr>
  ));

  return (
    <div className="w-full mt-12 ml-60 mx-auto max-w-xl">
      <h2 className="text-xl font-bold leading-7 text-gray-900 mb-8 sm:text-3xl sm:truncate">
        All reservations
      </h2>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              User
            </th>
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
              Personal reservation
            </th>
          </tr>
        </thead>
        <tbody>{getReservations}</tbody>
      </table>
      {showModal ? (
        <div>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <div className="w-full mt-12 mx-auto max-w-xl">
                    <div className="md:flex md:items-center mb-6">
                      <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                          Did the client show up?
                        </label>
                      </div>
                      <div className="md:w-2/3 form-check">
                        <input
                          className="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 my-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer"
                          type="checkbox"
                          checked={clientShowedUp}
                          onChange={onClientShowUpChange}
                        />
                      </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                      <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                          Penalty suggestion?
                        </label>
                      </div>
                      <div className="md:w-2/3 form-check">
                        <input
                          className="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 my-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer"
                          type="checkbox"
                          checked={penaltySuggestion}
                          onChange={onPenaltySuggestionChange}
                        />
                      </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                      <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                          Your comment
                        </label>
                      </div>
                      <div className="md:w-2/3 form-check">
                        <textarea
                          className="
                            form-control
                            block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          placeholder="Your message"
                          onChange={onCommentChange}
                        ></textarea>
                      </div>
                    </div>

                    <button
                      className="btnRedWhite w-60 ml-30"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="btnBlueWhite w-60 ml-24"
                      onClick={createReport}
                    >
                      Send report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
      ) : null}
    </div>
  );
};

export default ReservationHistory;
