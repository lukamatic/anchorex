import { useState } from 'react';
import AuthContext, { AuthContextUser } from './context/auth-context';
import MyRouter from './components/MyRouter';
import localStorageUtil from './utils/local-storage/local-storage-util';

function App() {
  const [user, setUser] = useState<AuthContextUser>(localStorageUtil.getUser());

  const updateAuthContext = (user: AuthContextUser) => {
    setUser(user);
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <AuthContext.Provider
        value={{
          user: user,
          updateAuthContext: updateAuthContext,
        }}
      >
        <MyRouter />
      </AuthContext.Provider>
    </div>
  );
}

export default App;
