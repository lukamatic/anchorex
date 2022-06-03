import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthContext, { unsignedUser } from '../../context/auth-context';
import { UserRole } from '../../model/user-role.enum';
import localStorageUtil from '../../utils/local-storage/local-storage-util';
import { MenuLinksGenerator } from '../../utils/menu/menu-links-generator';
import MenuToggleButton from './MenuToggleButton';

const Menu = (props: { toggleMenu: () => void }) => {
	const authContext = useContext(AuthContext);
	const menuLinks = new MenuLinksGenerator().generate(authContext.user.role);
	const history = useHistory();

	const renderMenuLinks = () => {
		return menuLinks.map((menuLink) => (
			<Link key={menuLink.pathname} to={menuLink.pathname} onClick={props.toggleMenu}>
				<div className='w-full px-3 py-2 border-gray-100 border-b-2 text-center hover:bg-gray-100'>{menuLink.text}</div>
			</Link>
		));
	};

	const signOut = () => {
		authContext.updateAuthContext(unsignedUser);
		localStorageUtil.setUser(unsignedUser);
		props.toggleMenu();
		history.push('/');
	};

	return (
		<div className='flex flex-row absolute top-0 w-screen'>
			<div className='bg-black opacity-70 flex-grow' onClick={props.toggleMenu}></div>
			<div className='w-56 md:w-72 h-screen bg-white'>
				<div className='flex flex-row items-center justify-end bg-blue-500 pr-4 text-white py-1'>
					<MenuToggleButton toggleMenu={props.toggleMenu} />
				</div>
				{renderMenuLinks()}
				<button className='w-full' onClick={signOut}>
					<div className='px-3 py-2 border-gray-100 border-b-2 text-center hover:bg-gray-100'>Sign out</div>
				</button>
			</div>
		</div>
	);
};

export default Menu;
