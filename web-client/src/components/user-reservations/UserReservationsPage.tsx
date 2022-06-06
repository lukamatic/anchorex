import { format } from 'date-fns';
import { cloneElement, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import AuthContext from '../../context/auth-context';
import LeftArrow from '../../icons/LeftArrow';
import { cancelReservation, getAllLodgesAsync, getAllReservationsForUser } from '../../server/service';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import LoadingSpinner from '../common/LoadingSpinner';

const UserReservationsPage = () => {
	const history = useHistory();
	const { user, userDetails } = useContext(AuthContext);
	const authorized = !!user.loggedIn;
	const [reservations, setReservations] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const { addToast } = useToasts();

	useEffect(() => {
		loadReservations();
	}, []);

	const loadReservations = async () => {
		const resp = await getAllReservationsForUser(user.id);
		if (resp.status === HttpStatusCode.OK) {
			setReservations(resp.data);
			setLoading(false);
		}
	};
	const goBack = () => {
		history.goBack();
	};

	const cancelReservationForUser = async (id: number) => {
		const resp = await cancelReservation(id);
		if (resp.status == HttpStatusCode.OK) {
			loadReservations();
			addToast('Action was successful! ', {
				appearance: 'success',
				autoDismiss: true,
			});
		}
	};

	return (
		<div className='w-full flex bg-blue-50 flex-1 flex-col'>
			<div className='max-w-7xl self-center w-full pt-10 flex flex-1 flex-col'>
				<div>
					<div className='flex flex-row items-center'>
						<button className='flex flex-row items-center px-3 pt-1 w-28' onClick={goBack}>
							<LeftArrow className='' />
							<span className='ml-1'>Back</span>
						</button>
						<h1 className='text-2xl text-center flex-1'>User reservations</h1>
						<div className='w-28'></div>
					</div>
				</div>
				<div className='flex flex-col md:flex-row  flex-wrap mt-10'>
					{reservations?.map((reservation: any, index: number) => {
						const location = reservation?.location;
						const numberOfDays = new Date(reservation.endDate).getDate() - new Date(reservation.startDate).getDate() + 1;
						return (
							<div className='w-1/3 px-4 py-2' key={reservation.id}>
								<div className='p-3 rounded-lg w-full bg-white mt-2 shadow-md  h-full flex flex-col'>
									<div className='flex flex-col flex-1'>
										<p className='text-gray-700 text-lg text-left '>{reservation?.reservationName}</p>
										<p className='text-gray-400 text-xs text-left flex-1'>{reservation?.description}</p>
										<p className='text-gray-500 text-xs text-left'>
											Address: {location?.address}, {location?.city}
										</p>
										<p className='text-gray-500 text-xs text-left'>Avg.score: {reservation.averageRating}</p>
										<div className='p-2 rounded-md border-2 border-solid border-blue-200 my-5 w-full'>
											<p className='text-gray-500 mb-0'>Services: </p>
											<p className='text-gray-300 mb-0 text-sm border-b border-solid border-blue-200 w-full pb-2'></p>
											{reservation.services?.map((service: any, index: number) => {
												const isSelected = false;

												return (
													<div key={index} className={` flex flex-row items-center mt-2 ${isSelected ? '' : ''}`}>
														<span className='ml-2 text-gray-400 flex-1'>{service.info}</span>
														<span className='ml-2 text-gray-300 text-xs'>${service.price * reservation.maxPersonNumber * numberOfDays}</span>
													</div>
												);
											})}
										</div>
										{!!reservation?.startDate && (
											<div className='flex flex-row justify-between text-gray-500 text-md'>
												📆 {format(new Date(reservation?.startDate), 'dd. MMM')}-{format(new Date(reservation.endDate), 'dd. MMM yyyy.')}
											</div>
										)}
										<div className='flex flex-row justify-between items-center'>
											<p className='text-gray-500 text-md text-left'>👥 {reservation.maxPersonNumber}</p>
											<p className='text-gray-500 text-md text-left'>💸 ${reservation.price}</p>
										</div>
										<div>
											<button
												className='px-3 py-2 bg-yellow-200 rounded-md 
													shadow-md hover:shadow-lg self-end w-full mt-4 transform 
													hover:scale-105 transition-transform duration-120 font-semibold text-gray-600'
												onClick={() => {
													console.log(reservation);
													// return;

													cancelReservationForUser(reservation.id);
												}}
											>
												Cancel reservation
											</button>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
				<div className='flex flex-col md:flex-row  flex-wrap mt-10'>
					{!loading && reservations.length === 0 && (
						<div className='text-center flex-1 flex justify-center items-center'>
							<div className='text-gray-400 '> This list is currently empty... </div>
						</div>
					)}
				</div>

				{loading && (
					<div className='flex flex-1 justify-center items-center h-full'>
						<LoadingSpinner />
					</div>
				)}
			</div>
		</div>
	);
};

export default UserReservationsPage;
