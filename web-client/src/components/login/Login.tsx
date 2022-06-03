import { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import AuthContext, { AuthContextUser } from '../../context/auth-context';
import { UserRole } from '../../model/user-role.enum';
import { getUserByTokenAsync } from '../../server/service';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import localStorageUtil from '../../utils/local-storage/local-storage-util';
import LoadingSpinner from '../common/LoadingSpinner';

const Login = () => {
	const authContext = useContext(AuthContext);
	const history = useHistory();

	const [fetching, setFetching] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorLabelText, setErrorLabelText] = useState('');

	const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const passwordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	const logIn = async (e: any) => {
		e.preventDefault();
		const url: string = '/api/auth/login';
		const data = { email: email, password: password };

		setFetching(true);

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

				const user: AuthContextUser = {
					accessToken: content.userTokenState.accessToken,
					loggedIn: true,
					id: content.userId,
					email: email,
					role: content.userRole,
				};

				authContext.updateAuthContext(user);
				localStorageUtil.setUser(user);

				if (localStorageUtil.getUserRole() === UserRole.LODGE_OWNER) {
					history.push('/lodges');
				} else if (localStorageUtil.getUserRole() === UserRole.SHIP_OWNER) {
					history.push('/ships');
				} else {
					history.push('/');
				}
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

		setFetching(false);
	};

	return (
		<div className='flex flex-col items-center flex-grow bg-blue-50 p-3'>
			<form onSubmit={logIn} className='flex flex-col bg-white w-full md:w-80 md:text-lg mt-12 md:mt-40 m-5 p-5 rounded-lg shadow-lg'>
				<input className='input mt-3 mb-2' type='email' name='email' id='email' placeholder='Enter email' onChange={emailChangeHandler} />
				<input className='input' type='password' name='password' id='password' placeholder='Enter password' onChange={passwordChangeHandler} />
				<p className='self-center text-red-500 text-center w-52 mt-3 mb-3'>{errorLabelText}</p>
				{fetching ? (
					<div className='flex justify-center items-center mb-3'>
						<LoadingSpinner />
					</div>
				) : (
					<button className='btnBlueWhite mb-3' type='submit'>
						Log in
					</button>
				)}
			</form>
			<Link className='btnWhiteBlue mb-3 text-center' to='/signupChoice'>
				Sign up
			</Link>
			{/* </form> */}
		</div>
	);
};

export default Login;
