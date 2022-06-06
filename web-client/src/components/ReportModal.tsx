import axios from 'axios';
import { useState } from 'react';
import { HttpStatusCode } from '../utils/http-status-code.enum';
import { LocalStorageItem } from '../utils/local-storage/local-storage-item.enum';

const ReportModal = (props: { close: () => void }) => {
  const [clientId, setClientId] = useState(0);
  const [clientShowedUp, setClientShowUp] = useState(true);
  const [penaltySuggestion, setPenaltySuggestion] = useState(false);
  const [comment, setComment] = useState('');

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
        '/api/reservation/report?email=' +
          localStorage.getItem(LocalStorageItem.EMAIL),
        report,
        {
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
            Authorization:
              'Bearer ' + localStorage.getItem(LocalStorageItem.ACCESS_TOKEN),
          },
        }
      )
      .then((response) => {
        if (response.status == HttpStatusCode.CREATED) {
          window.alert('Report successfully sent!');
          window.location.reload();
        }
      });
  };

  return (
    <div>
      <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
        <div className='relative w-auto my-6 mx-auto max-w-3xl'>
          <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
            <div className='flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t'>
              <div className='w-full mt-12 mx-auto max-w-xl'>
                <div className='md:flex md:items-center mb-6'>
                  <div className='md:w-1/3'>
                    <label className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'>
                      Did the client show up?
                    </label>
                  </div>
                  <div className='md:w-2/3 form-check'>
                    <input
                      className='form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 my-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer'
                      type='checkbox'
                      checked={clientShowedUp}
                      onChange={onClientShowUpChange}
                    />
                  </div>
                </div>
                <div className='md:flex md:items-center mb-6'>
                  <div className='md:w-1/3'>
                    <label className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'>
                      Penalty suggestion?
                    </label>
                  </div>
                  <div className='md:w-2/3 form-check'>
                    <input
                      className='form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 my-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer'
                      type='checkbox'
                      checked={penaltySuggestion}
                      onChange={onPenaltySuggestionChange}
                    />
                  </div>
                </div>
                <div className='md:flex md:items-center mb-6'>
                  <div className='md:w-1/3'>
                    <label className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'>
                      Your comment
                    </label>
                  </div>
                  <div className='md:w-2/3 form-check'>
                    <textarea
                      className='
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
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                      placeholder='Your message'
                      onChange={onCommentChange}
                    ></textarea>
                  </div>
                </div>

                <button
                  className='btnRedWhite w-60 ml-30'
                  type='button'
                  onClick={props.close}
                >
                  Close
                </button>
                <button
                  className='btnBlueWhite w-60 ml-24'
                  onClick={createReport}
                >
                  Send report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
    </div>
  );
};

export default ReportModal;
