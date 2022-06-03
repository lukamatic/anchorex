import axios from 'axios';
import { useState, useContext, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import AuthContext from '../../context/auth-context';
import { UserRole } from '../../model/user-role.enum';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import { LocalStorageItem } from '../../utils/local-storage/local-storage-item.enum';
import localStorageUtil from '../../utils/local-storage/local-storage-util';

const FishingLessonDisplayImages = () => {
  const params: { id: string } = useParams();
  const [entity, setEntity] = useState<any>();
  const authContext = useContext(AuthContext);
  const userRole = authContext.user.role;
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    axios
      .get('/api/fishingLessons/' + params.id, {
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
          Authorization:
            'Bearer ' + localStorage.getItem(LocalStorageItem.ACCESS_TOKEN),
        },
      })
      .then((response) => {
        setEntity(response.data);
      });
  }, []);

  const uploadPhotos = () => {
    const url = `/api/fishingLessons/${params.id}/images/add`;
    const body = new FormData();
    const headers = [
      ['Authorization', 'Bearer ' + localStorageUtil.getAccessToken()],
    ];

    const files = fileInput.current!.files!;

    for (let i = 0; i < files.length; i++) {
      body.append(`files`, files[i]);
    }

    fetch(url, {
      method: 'POST',
      headers: headers,
      body: body,
    }).then((response) => {
      switch (response.status) {
        case HttpStatusCode.OK:
          window.location.reload();
          break;
        default:
          alert('Unknown error occurred');
      }
    });
  };

  const removeImage = async (imageId: number) => {
    const url = `/api/fishingLessons/images/remove/${imageId}`;
    const headers = [
      ['Authorization', 'Bearer ' + localStorageUtil.getAccessToken()],
    ];

    const response = await fetch(url, {
      method: 'DELETE',
      headers: headers,
    });

    switch (response.status) {
      case HttpStatusCode.OK:
        window.location.reload();
        break;
      default:
        alert('Unknown error occurred');
    }
  };

  return (
    <div>
      <div>
        <nav className='flex flex-col bg-blue-500 w-64 float-left h-screen px-4 tex-gray-900 border border-blue-900'>
          <div className='mt-10 mb-4'>
            <ul className='ml-4'>
              <Link to={'/fishingLesson/' + params.id}>
                <li
                  className='mb-2 px-4 py-4 text-gray-100 flex flex-row  border-gray-300 hover:text-black   
                hover:bg-gray-300  hover:font-bold rounded'
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

              <Link to={'/fishingLessonImages/' + params.id}>
                <li className='mb-2 px-4 py-4 text-black-100 flex flex-row bg-gray-300 border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded'>
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
              <Link to={'/fishingLessonAction/' + params.id}>
                <li className='mb-2 px-4 py-4 text-gray-100 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded'>
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
              <Link to={'/fishingLessonPricelist/' + params.id}>
                <li className='mb-2 px-4 py-4 text-gray-100 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded'>
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
              <Link to={'/fishingLessonRules/' + params.id}>
                <li className='mb-2 px-4 py-4 text-gray-100 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded'>
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
              <Link to={'/fishingLessonKit/' + params.id}>
                <li className='mb-2 px-4 py-4 text-gray-100 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded'>
                  <svg
                    version='1.0'
                    id='Layer_1'
                    xmlns='http://www.w3.org/2000/svg'
                    xmlnsXlink='http://www.w3.org/1999/xlink'
                    x='0px'
                    y='0px'
                    fill='#FFFFFF'
                    width='24px'
                    height='24px'
                    viewBox='0 0 100 100'
                    enableBackground='new 0 0 100 100'
                    xmlSpace='preserve'
                  >
                    <path
                      d='M60,10.001c-7.363,0-13.333,5.97-13.333,13.333c0,6.204,4.258,11.373,10,12.861v35.471c0,6.445-5.225,11.666-11.667,11.666
c-6.445,0-11.667-5.221-11.667-11.666v-3.334H40L26.667,48.334v23.332c0,10.13,8.209,18.333,18.333,18.333
s18.333-8.203,18.333-18.333V36.195c5.739-1.488,10-6.657,10-12.861C73.333,15.971,67.363,10.001,60,10.001z M60,30
c-3.682,0-6.667-2.984-6.667-6.666s2.985-6.667,6.667-6.667s6.667,2.985,6.667,6.667S63.682,30,60,30z'
                    />
                  </svg>

                  <span className='ml-2'>Fishing kit</span>
                </li>
              </Link>
            </ul>
          </div>
        </nav>
      </div>
      <div className='container flex flex-col mx-auto w-full mt-12 ml-96 max-w-4xl'>
        {entity && (
          <div className='flex flex-col mr-5'>
            {entity.images.map((image: any) => (
              <div className='flex mb-7 items-center' key={image.id}>
                <img src={image.url} />
                <button
                  className='btnWhiteBlue'
                  onClick={() => removeImage(image.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
        {authContext.user.role === UserRole.INSTRUCTOR && (
          <div className='mb-20'>
            <input
              type='file'
              accept='.png,.jpg,.jpeg,.mp4'
              multiple
              ref={fileInput}
            />
            <button className='btnBlueWhite mt-5' onClick={uploadPhotos}>
              Upload images
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FishingLessonDisplayImages;
