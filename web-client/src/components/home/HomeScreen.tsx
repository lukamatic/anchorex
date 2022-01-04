import { cloneElement } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import SearchWithSelect from '../common/SearchWithSelect';
import CoachingIcon from './button-icons/CoachingIcon';
import FishingIcon from './button-icons/FishingIcon';
import HouseIcon from './button-icons/HouseIcon';
import './Home.css';
const HomeScreen = () => {
	const history = useHistory();
	const authorized = true;
	const user = {
		firstName: 'Petar',
		lastName: 'Obradovic',
	};
	const buttons = [
		{
			title: 'Fishing lessons',
			description: 'fishing lessons description....',
			logo: <FishingIcon height={70} />,
			path: 'fishingLessons',
			data: [
				{ name: 'Lesson 1', description: 'Description....', images: [require('./../../images/ent1.jpg')] },
				{ name: 'Lesson 2', description: 'Description....', images: [require('./../../images/ent2.jpg')] },
				{ name: 'Lesson 3', description: 'Description....', images: [require('./../../images/ent3.jpg')] },
				{ name: 'Lesson 4', description: 'Description....', images: [require('./../../images/ext1.jpg')] },
				{ name: 'Lesson 5', description: 'Description....', images: [require('./../../images/ext2.jpg')] },
			],
		},
		{
			title: 'Ships',
			description: 'Ships description....',
			path: 'ships',
			logo: <CoachingIcon height={80} />,
			data: [{ name: 'Lesson 1', description: 'Description....', images: [require('./../../images/ent1.jpg')] }],
		},
		{
			title: 'Lodges',
			path: 'lodges',
			description: 'Lodges description....',
			logo: <HouseIcon height={80} />,
			data: [],
		},
	];
	const openFullList = (type: string) => {
		history.push(`/listScreen/${type}`);
	};

	const authorizedButtons = [
		{
			title: 'Reservations',
			callback: () => {},
		},
		{
			title: 'History',
			callback: () => {},
		},
		{
			title: 'Penalties',
			callback: () => {},
		},
		{
			title: 'Reports',
			callback: () => {},
		},
		{
			title: 'Promotions',
			callback: () => {},
		},
	];

	const homeButton = (type: any) => (
		<a className='bg-blue-100 w-full h-36 rounded-lg shadow-md hover:shadow-lg my-2 md:w-1/4 flex items-center justify-center transition-transform duration-120 transform hover:scale-125' href={`#${type.title.toLowerCase()}`}>
			<div className='justify-center w-full flex flex-col flex-1'>
				<div className='flex-1 mx-auto'>{type?.logo && cloneElement(type?.logo)}</div>
				<span className='font-gray-700 text-xl text-center  w-full'>{type.title}</span>
			</div>
		</a>
	);
	const authorizedButton = (type: any) => (
		<button onClick={type.callback} className='bg-white w-full h-14 rounded-lg shadow-md hover:shadow-lg my-2 md:w-1/6 flex items-center justify-center transition-transform duration-120 transform hover:scale-110'>
			<div className='justify-center w-full flex flex-col flex-1'>
				<span className='font-gray-700 text-xl text-center  w-full'>{type.title}</span>
			</div>
		</button>
	);
	return (
		<div className='w-full flex bg-blue-50 flex-1 flex-col'>
			<div className='px-12 pt-12  pb-5'>
				<div className=''></div>
				{authorized && (
					<div className='text-center py-3 mb-12'>
						<h1 className='subpixel-antialiased text-3xl font-bold text-gray-700'>Hi, {user.firstName}</h1>
						<h3 className='subpixel-antialiased font-semibold text-gray-700'>Online Bookings for the finest fishing lessons, ships and lodges.</h3>
					</div>
				)}
				{!authorized && (
					<div className='text-center py-3 mb-12'>
						<h1 className='subpixel-antialiased text-3xl font-bold text-gray-700'>Lake Bookings</h1>
						<h3 className='subpixel-antialiased font-semibold text-gray-700'>Online Bookings for the finest fishing lessons, ships and lodges.</h3>
					</div>
				)}
				<div className='flex flex-col justify-around flex-1 md:flex-row z-10'>{buttons.map((button, i) => homeButton(button))}</div>
				{authorized && <div className='flex flex-col justify-around flex-1 md:flex-row mt-4'>{authorizedButtons.map((button, i) => authorizedButton(button))}</div>}
			</div>
			<div className='max-w-7xl self-center w-full'>
				{buttons.map((section, i) => {
					const emptyList = !section?.data?.length;

					return (
						<div className='w-full mx-auto mt-1 flex-1 p-3 rounded pt-12' id={`${section.title.toLowerCase()}`}>
							<div className='border border-b border-t-0 border-r-0 border-l-0 pb-1 border-gray-300'>
								<h1 className='text-lg'>{section.title}</h1>
								<h3 className='font-normal text-base text-gray-500'>{section.description}</h3>
							</div>
							<div className='flex flex-col md:flex-row  flex-wrap '>
								{section?.data?.splice(0, 3)?.map((item, i) => {
									return (
										<div className='w-1/3 px-4 py-2'>
											<button className='p-3 rounded-lg w-full bg-white mt-24 shadow-md hover:shadow-2xl transition-transform duration-75 transform hover:scale-105'>
												<div className=' overflow-hidden rounded-lg -mt-24  shadow-lg mb-2'>
													<img src={item.images[0].default} alt='Item' className='object-cover h-52 w-full' />
												</div>
												<div>
													<p className='text-gray-700 text-lg text-left'>{item.name}</p>
													<p className='text-gray-500 text-xs text-left'>{item.description}</p>
												</div>
											</button>
										</div>
									);
								})}
								{emptyList && (
									<div className='px-4 py-2 flex justify-center items-center flex-1'>
										<div className='h-52 border border-gray-200 rounded-xl text-gray-300 p-3 flex flex-col justify-center items-center flex-1'>This list is currently empty...</div>
									</div>
								)}
							</div>
							{!emptyList && (
								<div className='flex justify-end mt-2 '>
									<button
										className='text-gray-400'
										onClick={() => {
											openFullList(section.path);
										}}
									>
										Open full list
									</button>
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default HomeScreen;