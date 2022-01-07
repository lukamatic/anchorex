import axios from 'axios';
import L from 'leaflet';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AuthContext from '../../context/auth-context';
import { UserRole } from '../../model/user-role.enum';
import { LocalStorageItem } from '../../utils/local-storage/local-storage-item.enum';

const ReservationEntityDisplay = () => {
  const authContext = useContext(AuthContext);
  const parameters: { id: string } = useParams();
  const userRole = authContext.userRole;

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [location, setLocation] = useState({latitude, longitude, address, city, country})
  const [entity, setEntity] = useState({name, address, description, location});


  useEffect(() => {
    var mymap = L.map("mapid").setView([45.2635752, 19.8434573], 13);
    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          "pk.eyJ1Ijoib2dpamFoIiwiYSI6ImNrcXMzbjR0ZDE3N24zMXFhOXM5MDlmeWwifQ.V05sowv93LiOgv4O-0bIgw",
      }
    ).addTo(mymap);


    if(userRole === UserRole.LODGE_OWNER){
      axios.get("http://localhost:8088/api/reservationEntity/lodge/" + parameters.id,{
        headers:{
          Accept : 'application/json',
          'Content-type': 'application/json',
          'Authorization':'Bearer ' +  localStorage.getItem(LocalStorageItem.ACCESS_TOKEN)
        }
      }).then((response) => {
        setName(response.data.name)
        setDescription(response.data.description)
        setLocation(response.data.location)
        setLatitude(response.data.location.latitude)
        setLongitude(response.data.location.longitude)
        setAddress(response.data.location.address)
        setCity(response.data.location.city)
        setCountry(response.data.location.country)
        L.marker([response.data.location.latitude, response.data.location.longitude]).addTo(mymap);
        setEntity(response.data)
        console.log(response.data)
      })
    }
  },[]);


  const nameChangeHandler = (value:string) => {
    setName(value);
    entity.name = value;
    console.log(entity)
    console.log(address)
  };

  const descriptionChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    setDescription(value);
    entity.description = value;
    console.log(entity)
  };

  
  const changeEntity = () => {
    console.log(entity);
  };
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossOrigin=""
      />
      <script
        src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
        integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
        crossOrigin=""
      ></script>
      <script
        src="https://unpkg.com/esri-leaflet@3.0.4/dist/esri-leaflet.js"
        integrity="sha512-oUArlxr7VpoY7f/dd3ZdUL7FGOvS79nXVVQhxlg6ij4Fhdc4QID43LUFRs7abwHNJ0EYWijiN5LP2ZRR2PY4hQ=="
        crossOrigin=""
      ></script>
      <link
        rel="stylesheet"
        href="https://unpkg.com/esri-leaflet-geocoder@3.1.1/dist/esri-leaflet-geocoder.css"
        integrity="sha512-IM3Hs+feyi40yZhDH6kV8vQMg4Fh20s9OzInIIAc4nx7aMYMfo+IenRUekoYsHZqGkREUgx0VvlEsgm7nCDW9g=="
        crossOrigin=""
      />
      <script src="https://unpkg.com/esri-leaflet-geocoder@3.0.0/dist/esri-leaflet-geocoder.js"></script>
      <div>
        <nav className='flex flex-col bg-blue-500 w-64 float-left h-screen px-4 tex-gray-900 border border-blue-900'>
          <div className='mt-10 mb-4'>
            <ul className='ml-4'>
              <Link to={'/reservationEntities/' + parameters.id}>
                <li
                  className='mb-2 px-4 py-4 text-black-100 flex flex-row bg-gray-300 border-gray-300 hover:text-black   
            hover:bg-gray-300  hover:font-bold rounded rounded-lg'
                >
                  <span>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='#FFFFFF'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <path d='M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9' />
                      <path d='M9 22V12h6v10M2 10.6L12 2l10 8.6' />
                    </svg>
                  </span>

                  <span className='ml-2'>Home</span>
                </li>
              </Link>

              <Link to={'/reservationEntitiesImages/' + parameters.id}>
                <li className='mb-2 px-4 py-4 text-gray-100 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded rounded-lg'>
                  <span>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='#FFFFFF'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <rect x='3' y='3' width='18' height='18' rx='2' />
                      <circle cx='8.5' cy='8.5' r='1.5' />
                      <path d='M20.4 14.5L16 10 4 20' />
                    </svg>
                  </span>
                  <span className='ml-2'>Images</span>
                </li>
              </Link>
              <Link to={'/reservationEntitiesAction/' + parameters.id}>
                <li className='mb-2 px-4 py-4 text-gray-100 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded rounded-lg'>
                  <span>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='#FFFFFF'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <rect
                        x='3'
                        y='4'
                        width='18'
                        height='18'
                        rx='2'
                        ry='2'
                      ></rect>
                      <line x1='16' y1='2' x2='16' y2='6'></line>
                      <line x1='8' y1='2' x2='8' y2='6'></line>
                      <line x1='3' y1='10' x2='21' y2='10'></line>
                    </svg>
                  </span>
                  <span className='ml-2'>Quick reservation</span>
                </li>
              </Link>
              <Link to={'/reservationEntitiesPricelist/' + parameters.id}>
                <li className='mb-2 px-4 py-4 text-gray-100 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded rounded-lg'>
                  <span>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='#FFFFFF'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <line x1='12' y1='1' x2='12' y2='23'></line>
                      <path d='M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'></path>
                    </svg>
                  </span>
                  <span className='ml-2'>Pricelist</span>
                </li>
              </Link>

              <Link to={'/reservationEntitiesRules/' + parameters.id}>
                <li className='mb-2 px-4 py-4 text-gray-100 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded rounded-lg'>
                  <span>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='#FFFFFF'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <circle cx='12' cy='12' r='10'></circle>
                      <line x1='12' y1='8' x2='12' y2='12'></line>
                      <line x1='12' y1='16' x2='12.01' y2='16'></line>
                    </svg>
                  </span>
                  <span className='ml-2'>Conduct rules</span>
                </li>
              </Link>
            </ul>
          </div>
        </nav>
      </div>
      <div className='w-full mt-12 mx-auto max-w-xl'>
        <div className='md:flex md:items-center mb-6'>
          <div className='md:w-1/3'>
            <label className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'>
              Full Name
            </label>
          </div>
          <div className='md:w-2/3'>
            {userRole === UserRole.LODGE_OWNER ? (
              <input
                className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500'
                id='inline-full-name'
                type='text'
                name='name'
                value={name}
                onChange={e => nameChangeHandler(e.target.value)}
              ></input>
            ) : (
              <input
                disabled
                className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500'
                id='inline-full-name'
                type='text'
                name='name'
                value={entity.name}
              ></input>
            )}
          </div>
        </div>
        <div className='md:flex md:items-center mb-6'>
          <div className='md:w-1/3'>
            <label className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'>
              Address
            </label>
          </div>
          <div className='md:w-2/3'>
              <input
                disabled
                className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500'
                id='inline-password'
                name='address'
                value={address + "," + city + "," + country}
              ></input>
          </div>
        </div>
        <div id="mapid" className="h-96 w-auto "></div>

        <div className='md:flex md:items-center mb-6'>
          <div className='md:w-1/3'>
            <label className='block text-gray-500 font-bold md:text-right ml-32 mb-1 md:mb-0 pr-4'>
              Select rooms
            </label>
          </div>
          <select className='block appearance-none w-full bg-white border ml-2 border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'>
            <option>Single room</option>
            <option>Double room</option>
            <option>Four-bed room</option>
          </select>
          <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
            <svg
              className='fill-current h-4 w-4'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
            >
              <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
            </svg>
          </div>
        </div>
        <div className='md:flex md:items-center mb-6'>
          <div className='md:w-1/3'>
            <label className='block text-gray-500 font-bold md:text-right ml-24 mb-1 md:mb-0 pr-4'>
              Promo description
            </label>
          </div>
          {userRole === UserRole.LODGE_OWNER ? (
            <textarea
              name='description'
              onChange={descriptionChangeHandler}
              value={description}
              className='block readonly appearance-none w-full bg-white border  border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
            />
          ) : (
            <textarea
              disabled
              name='description'
              className='block readonly appearance-none w-full bg-white border  border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
            />
          )}

          <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 '>
            <svg
              className='fill-current h-4 w-4'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
            >
              <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
            </svg>
          </div>
        </div>
        <div className='md:flex md:items-center mb-6'>
          

          <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
            <svg
              className='fill-current h-4 w-4'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
            >
              <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
            </svg>
          </div>
        </div>
      
        {userRole === UserRole.LODGE_OWNER ? (
          <div>
            <button className='btnBlueWhite w-72 ml-60' onClick={changeEntity}>
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
