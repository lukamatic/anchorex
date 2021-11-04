import { useState } from 'react';
import AuthContext from './context/auth-context';
import MyRouter from './components/MyRouter';
import LocalStorageUtil from './utils/local-storage-util';

function App() {
  const storage = new LocalStorageUtil();
  const [userRole, setUserRole] = useState(storage.getUserRole());

  return (
    <AuthContext.Provider
      value={{ userRole: userRole, setUserRole: setUserRole }}
    >
      <MyRouter />
    </AuthContext.Provider>
  );
}

export default App;
