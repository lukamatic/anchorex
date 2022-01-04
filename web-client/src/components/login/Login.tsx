import { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import AuthContext from '../../context/auth-context';
import { UserRole } from '../../model/user-role.enum';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import localStorageUtil from '../../utils/local-storage/local-storage-util';

const Login = () => {
  const authContext = useContext(AuthContext);
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorLabelText, setErrorLabelText] = useState('');

  const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(event.target.value);
  };

  const logInAsInstructor = () => {
    //TODO: send login request
    const userRole = UserRole.INSTRUCTOR; // for testing only
    authContext.setUserRole(userRole);
    localStorageUtil.setUserRole(userRole);
    history.push('/');
  };

  const logInAsLodgeOwner = () => {
    const userRole = UserRole.LODGE_OWNER; // for testing only
    authContext.setUserRole(userRole);
    localStorageUtil.setUserRole(userRole);
    history.push('/');
  };

  const logIn = async (event: React.FormEvent) => {
    event.preventDefault();
    const url: string = '/api/auth/login';
    const data = { email: email, password: password };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    switch (response.status) {
      case HttpStatusCode.OK:
        setErrorLabelText('');

        var content = await response.json();
        localStorageUtil.setAccessToken(content.userTokenState.accessToken);
        localStorageUtil.setUserRole(content.userRole);

        authContext.setUserRole(localStorageUtil.getUserRole());

        history.push('/');
        break;
      case HttpStatusCode.UNAUTHORIZED:
        setErrorLabelText('Invalid credentials!');
        break;
      case HttpStatusCode.FORBIDDEN:
        setErrorLabelText('');
        history.push('/verification');
        break;
      default:
        setErrorLabelText('Unknown error occurred.');
        break;
    }
  };

  return (
    <div className='flex flex-col items-center flex-grow bg-blue-50 p-3'>
      {false && (
        <div>
          <button className='btnBlueWhite m-5' onClick={logInAsInstructor}>
            Log in as instructor
          </button>
          <button className='btnBlueWhite m-5' onClick={logInAsLodgeOwner}>
            Log in as lodge owner
          </button>
        </div>
      )}
      <div className='flex flex-col bg-white w-full md:w-80 md:text-lg mt-12 md:mt-40 m-5 p-5 rounded-lg shadow-lg'>
        <input
          className='input mt-3 mb-2'
          type='text'
          name='email'
          placeholder='Enter email'
          onChange={emailChangeHandler}
        />
        <input
          className='input'
          type='password'
          name='password'
          placeholder='Enter password'
          onChange={passwordChangeHandler}
        />
        <p className='self-center text-red-500 text-center w-52 mt-3 mb-6'>
          {errorLabelText}
        </p>
        <button className='btnBlueWhite mb-3' onClick={logIn}>
          Log in
        </button>
        <button className='btnWhiteBlue mb-3' onClick={logIn}>
          Sign up
        </button>
      </div>
    </div>
  );
};

export default Login;
