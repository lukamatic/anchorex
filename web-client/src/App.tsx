import { useEffect, useState } from 'react';
import AuthContext, { AuthContextUser } from './context/auth-context';
import MyRouter from './components/MyRouter';
import localStorageUtil from './utils/local-storage/local-storage-util';
import CreateUserDto, { emptyCreateUserDto } from './dtos/create-user.dto';
import { HttpStatusCode } from './utils/http-status-code.enum';
import { getUserByTokenAsync } from './server/service';
import SplashScreen from './components/SplashScreen';

function App() {
	const userToken = localStorageUtil.getAccessToken();
	const [userRole, setUserRole] = useState(localStorageUtil.getUserRole());
	const [user, setUser] = useState<AuthContextUser>(localStorageUtil.getUser());
	const [userDetails, setUserDetails] = useState<CreateUserDto>(emptyCreateUserDto);
	const [isLoading, setLoading] = useState(!!userToken);

	useEffect(() => {
		if (!userDetails.firstName && isLoading) {
			checkUserAuth();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userToken]);

	const updateAuthContext = (user: AuthContextUser) => {
		setUser(user);
	};

	const checkUserAuth = async () => {
		const resp = await getUserByTokenAsync();
		if (resp.status === HttpStatusCode.OK) {
			setUserDetails(resp.data);
		} else {
			localStorage.clear();
		}
		setLoading(false);
	};

	return (
		<div className='flex flex-col min-h-screen'>
			{isLoading && <SplashScreen />}
			{!isLoading && (
				<AuthContext.Provider
					value={{
						user: user,
						updateAuthContext: updateAuthContext,
						userDetails: userDetails,
					}}
				>
					<MyRouter />
				</AuthContext.Provider>
			)}
		</div>
	);
}

export default App;
