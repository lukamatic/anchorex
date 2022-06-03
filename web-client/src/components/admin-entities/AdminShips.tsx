import { useEffect, useState } from 'react';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import localStorageUtil from '../../utils/local-storage/local-storage-util';

const AdminShips = () => {
  const [entities, setEntities] = useState<any[]>();

  useEffect(() => {
    const fetchEntities = async () => {
      const response = await fetch('/api/ship/all', {
        headers: [
          ['Authorization', 'Bearer ' + localStorageUtil.getAccessToken()],
        ],
      });

      switch (response.status) {
        case HttpStatusCode.OK:
          const entities = await response.json();
          setEntities(entities);
          break;
        default:
          alert('Uknown error occurred');
      }
    };

    fetchEntities();
  }, []);

  const deleteEntity = async (id: number) => {
    const response = await fetch(`/api/ship/deleteShip/${id}`, {
      method: 'DELETE',
      headers: [
        ['Authorization', 'Bearer ' + localStorageUtil.getAccessToken()],
      ],
    });

    switch (response.status) {
      case HttpStatusCode.OK:
        setEntities((entities) => entities!.filter((e) => e.id !== id));
        break;
      default:
        alert('Uknown error occurred');
    }
  };

  return (
    <div className='flex flex-col flex-grow items-center bg-blue-50'>
      <div className='flex flex-col items-center w-500px py-10'>
        {entities?.map((entity) => (
          <div
            key={entity.id}
            className='flex items-center w-full justify-between p-4 bg-white rounded-md shadow-lg mb-3'
          >
            <div>{entity.name}</div>
            <button
              className='btnRedWhite'
              onClick={() => deleteEntity(entity.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminShips;
