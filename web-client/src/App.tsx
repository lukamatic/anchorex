import { useEffect, useState } from 'react';
import AuthContext from './context/auth-context';
import MyRouter from './components/MyRouter';
import localStorageUtil from './utils/local-storage/local-storage-util';
import CreateUserDto from './dtos/create-user.dto';
import { HttpStatusCode } from './utils/http-status-code.enum';
import { getUserByTokenAsync } from './server/service';
import SplashScreen from './components/SplashScreen';

function App() {
	const [userRole, setUserRole] = useState(localStorageUtil.getUserRole());
	const [user, setUser] = useState<CreateUserDto>({} as CreateUserDto);
	const [isLoading, setLoading] = useState(true);
	useEffect(() => {
		if (!user.firstName && isLoading) {
			checkUserAuth();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const checkUserAuth = async () => {
		const resp = await getUserByTokenAsync();
		if (resp.status === HttpStatusCode.OK) {
			setUser(resp.data);
		} else {
			// setUser({} as CreateUserDto);
		}
		setLoading(false);
	};

	return (
		<div className='flex flex-col min-h-screen'>
			{isLoading && <SplashScreen />}
			{!isLoading && (
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
			)}
		</div>
	);
}

export default App;
