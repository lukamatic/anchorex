import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import { UserRole } from "../../model/user-role.enum";
import { LocalStorageItem } from "../../utils/local-storage/local-storage-item.enum";

const LodgeDisplayPricelist = () => {
  const params: { id: string } = useParams();
  const authContext = useContext(AuthContext);
  const userRole = authContext.userRole;

  const [price, setPrice] = useState(0);
  const [info, setInfo] = useState("");
  const [type, setType] = useState("ADDITIONAL");

  const [currentService, setCurrentService] = useState({id:0, info, price, type });
  const [services, setServices] = useState([{id:0, info, price, type }]);
  useEffect(() => {
    axios
      .get("/api/reservationEntity/lodge/" + params.id, {
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization:
            "Bearer " + localStorage.getItem(LocalStorageItem.ACCESS_TOKEN),
        },
      })
      .then((response) => {
        console.log(response.data);
        setServices(response.data.services);
      });
  }, []);

  const serviceInfoChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setInfo(value.trim());
    currentService.info = value.trim();
    console.log(currentService);
  };

  const servicePriceChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setPrice(Number(value));
    currentService.price = Number(value);
    console.log(currentService);
  };

  const serviceTypeChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setType(value);
    currentService.type = value;
    console.log(currentService);
  };

  const addNewService =
    (service: { info: string; price: number; type: string }) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      axios
      .post("/api/reservationEntity/addService/" + params.id, service, {
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization:
            "Bearer " + localStorage.getItem(LocalStorageItem.ACCESS_TOKEN),
        },
      })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        window.alert(error.response.toString());
      });
    };

  const removeService =
    (index: number) => (event: React.MouseEvent<HTMLButtonElement>) => {
      axios.delete("/api/reservationEntity/deleteService/" + index,{
        headers:{
           Accept : 'application/json',
          'Content-type': 'application/json',
          'Authorization':'Bearer ' +  localStorage.getItem(LocalStorageItem.ACCESS_TOKEN)
        }
      }).then((response) => {
        window.location.reload()
      })
      
    };
  return (
    <div>
      <div>
        <nav className="flex flex-col bg-blue-500 w-64 float-left h-screen px-4 tex-gray-900 border border-blue-900">
          <div className="mt-10 mb-4">
            <ul className="ml-4">
              <Link to={"/lodge/" + params.id}>
                <li
                  className="mb-2 px-4 py-4  text-gray-100 flex flex-row  border-gray-300 hover:text-black   
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
              <Link to={"/lodgeAction/" + params.id}>
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

              <li className="mb-2 px-4 py-4 text-black-100 flex flex-row bg-gray-300 border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded rounded-lg">
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
                <a href="#">
                  <span className="ml-2">Pricelist</span>
                </a>
              </li>
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
            </ul>
          </div>
        </nav>
      </div>
      <div className="">
        <table className="table-fixed w-96 border-gray-800 mt-12 mx-auto border-4">
          <thead>
            <tr>
              <th className="w-1/2 ...">Offer</th>
              <th className="w-1/3 ...">Price</th>
              <th className="w-1/3 ...">Type</th>
            </tr>
          </thead>
          <tbody>
            {services
              .sort((a, b) => b.price - a.price)
              .map((s, i) => (
                <tr key={i} className="bg-blue-600  text-white">
                  <td>{s.info}</td>
                  <td>{s.price} $</td>
                  <td>{s.type}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {userRole === UserRole.LODGE_OWNER ? (
        <div>
          <div className="flex flex-wrap items-center mb-4 mt-4 ml-96">
            <p className="my-1">New service:</p>
            <input
              className="input resize-none w-52 h-10 ml-4 mb-4"
              placeholder="Add service name"
              name="service"
              onChange={serviceInfoChangeHandler}
            />
            <input
              className="input resize-none w-52 h-10 ml-4 mb-4"
              placeholder="Add service price"
              name="additionalService"
              type="number"
              min="0.1"
              step="0.1"
              onChange={servicePriceChangeHandler}
            />
            <select
              className="w-52 h-10 ml-4 mb-4 input"
              onChange={serviceTypeChangeHandler}
            >
              <option value="ADDITIONAL">Additional</option>
              <option value="REGULAR">Regular</option>
            </select>
            <button
              className="btnBlueWhite w-52 mb-4 h-10 ml-4"
              onClick={addNewService(currentService)}
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap items-center mb-3   ml-96">
            <ul>
              {services.map((s, i) => (
                <li key={i} className="mb-4">
                  Service name:{s.info} , Price: {s.price}$, Type: {s.type}
                  <button
                    className="btnBlueWhite w-12 h-8 ml-8"
                    onClick={removeService(s.id)}
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
                </li>
              ))}
            </ul>
          </div>
          
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default LodgeDisplayPricelist;
