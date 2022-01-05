import { BadgeCheckIcon, ExclamationCircleIcon, RefreshIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import { validateUserTokenAsync } from '../../server/service';
import { HttpStatusCode } from '../../utils/http-status-code.enum';

const Verification = (props: any) => {
	const search = window.location.search;
	const params = new URLSearchParams(search);
	const token = params.get('token');
	const [loading, setLoading] = useState(true);
	const [userValidated, setUserValidated] = useState(false);

	useEffect(() => {
		checkToken();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const checkToken = async () => {
		const resp = await validateUserTokenAsync(token);
		setLoading(false);
		if (resp.status === HttpStatusCode.OK) {
			setUserValidated(true);
		} else {
			setUserValidated(false);
		}
	};

	return (
		<div className='mx-auto'>
			{loading && (
				<div className='max-w-sm w-96 rounded overflow-hidden shadow-lg mt-20'>
					<div className='flex items-center bg-blue-100 justify-center py-5'>
						<RefreshIcon height={39} />
					</div>
					<div className='px-6 py-4'>
						<div className='font-bold text-xl mb-2'>Your token is validating</div>
						<p className='text-gray-700 text-base'>Please wait a couple of seconds</p>
					</div>
				</div>
			)}
			{!loading && !userValidated && (
				<div className='max-w-sm w-96 rounded overflow-hidden shadow-lg mt-20'>
					<div className='flex items-center bg-blue-100 justify-center py-5'>
						<ExclamationCircleIcon height={39} color='rgb(220, 38, 38)' />
					</div>
					<div className='px-6 py-4 text-center'>
						<div className='font-bold text-xl mb-6'>Your token is not valid</div>
						<a href='/' className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
							Please go back
						</a>
					</div>
				</div>
			)}
			{!loading && userValidated && (
				<div className='max-w-sm w-96 rounded overflow-hidden shadow-lg mt-20'>
					<div className='flex items-center bg-blue-100 justify-center py-5'>
						<BadgeCheckIcon height={39} color='green' />
					</div>
					<div className='px-6 py-4 text-center'>
						<div className='font-bold text-xl mb-6'>Your account is enabled now</div>
						<a href='/login' className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
							Go to login page
						</a>
					</div>
				</div>
			)}
		</div>
	);
};

export default Verification;
