import { useState } from 'react';
import AuthContext from './context/auth-context';
import MyRouter from './components/MyRouter';
import LocalStorageUtil from './utils/local-storage-util';

function App() {
	const storage = new LocalStorageUtil();
	const [userRole, setUserRole] = useState(storage.getUserRole());
	const [user, setUser] = useState({});

	return (
		<div className='flex flex-col min-h-screen'>
			<AuthContext.Provider value={{ userRole: userRole, setUserRole: setUserRole, setUser: setUser, user: user }}>
				<MyRouter />
			</AuthContext.Provider>
		</div>
	);
}

export default App;
