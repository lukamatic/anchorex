import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import AuthContext from "../../context/auth-context";

const ReservationEntityDisplayImages = () => {
  const authContext = useContext(AuthContext);
  const params: { id: string } = useParams();
  const ent1 = require("./../../images/ent1.jpg");
  const ent2 = require("./../../images/ent2.jpg");
  const ent3 = require("./../../images/ent3.jpg");
  const ext1 = require("./../../images/ext1.jpg");
  const ext2 = require("./../../images/ext2.jpg");
  const ext3 = require("./../../images/ext3.jpg");

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
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="M20.4 14.5L16 10 4 20" />
                    </svg>
                  </span>
                    <span className="ml-2">Images</span>
                </li>
              </Link>
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
      <div className="container grid grid-cols-3 gap-2 mx-auto w-full mt-12 ml-96 max-w-4xl">
        <div className="w-full rounded">
          <img src={ext1.default} alt="image" />
        </div>
        <div className="w-full rounded">
          <img src={ext2.default} alt="image" />
        </div>
        <div className="w-full rounded">
          <img src={ext3.default} alt="image" />
        </div>
        <div className="w-full rounded">
          <img src={ent1.default} alt="image" />
        </div>
        <div className="w-full rounded">
          <img src={ent2.default} alt="image" />
        </div>
        <div className="w-full rounded">
          <img src={ent3.default} alt="image" />
        </div>
      </div>
    </div>
  );
};

export default ReservationEntityDisplayImages;
