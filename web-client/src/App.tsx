import { useState } from 'react';
import AuthContext from './context/auth-context';
import MyRouter from './components/MyRouter';
import localStorageUtil from './utils/local-storage/local-storage-util';

function App() {
  const [userRole, setUserRole] = useState(localStorageUtil.getUserRole());
  const [user, setUser] = useState({});

  return (
    <div className='flex flex-col min-h-screen'>
      <AuthContext.Provider
        value={{
          userRole: userRole,
          setUserRole: setUserRole,
          setUser: setUser,
          user: user,
        }}
      >
        <MyRouter />
      </AuthContext.Provider>
    </div>
  );
}

export default App;
