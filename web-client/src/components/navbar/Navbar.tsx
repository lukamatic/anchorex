import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth-context';
import { UserRole } from '../../model/user-role.enum';
import localStorageUtil from '../../utils/local-storage/local-storage-util';
import LogoLink from './LogoLink';
import Menu from './Menu';
import MenuToggleButton from './MenuToggleButton';

const Navbar = () => {
	const authContext = useContext(AuthContext);
	const userRole = authContext.user.role;
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};
	return (
		<div className='flex flex-row justify-end sticky top-0 z-30'>
			<div className='w-screen flex flex-row justify-between items-center bg-blue-500 text-white pl-4 pr-4 py-1 flex-wrap'>
				<LogoLink />
				{userRole === UserRole.UNDEFINED ? (
					<div className='text-lg my-2 flex-grow flex justify-end'>
						<Link to='/login' className='mr-4'>
							Log in
						</Link>
						<Link to='/signupChoice'>Sign up</Link>
					</div>
				) : (
					<MenuToggleButton toggleMenu={toggleMenu} />
				)}
			</div>
			{isMenuOpen && <Menu toggleMenu={toggleMenu} />}
		</div>
	);
};

export default Navbar;
