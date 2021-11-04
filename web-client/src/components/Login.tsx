import { useContext } from 'react';
import { useHistory } from 'react-router';
import AuthContext from '../context/auth-context';
import { UserRole } from '../model/user-role.enum';
import LocalStorageUtil from '../utils/local-storage-util';

const Login = () => {
  const authContext = useContext(AuthContext);
  const storage = new LocalStorageUtil();
  const history = useHistory();

  const logIn = () => {
    //TODO: send login request
    const userRole = UserRole.INSTRUCTOR; // for testing only
    authContext.setUserRole(userRole);
    storage.setUserRole(userRole);
    history.push('/');
  };

  return (
    <div>
      <button className='btnBlueWhite m-5' onClick={logIn}>
        Log in
      </button>
    </div>
  );
};

export default Login;
