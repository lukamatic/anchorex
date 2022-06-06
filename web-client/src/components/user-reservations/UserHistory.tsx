import { StarIcon } from '@heroicons/react/solid';
import { format } from 'date-fns';
import { cloneElement, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../context/auth-context';
import LeftArrow from '../../icons/LeftArrow';
import { getAllHistoryReservationsForUser, getAllLodgesAsync, getAllReservationsForUser } from '../../server/service';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import LoadingSpinner from '../common/LoadingSpinner';
import ReservationHistoryItemLesson from './ReservationHistoryItemLesson';
import ReservationHistoryItemLodge from './ReservationHistoryItemLodge';
import ReservationHistoryItemShip from './ReservationHistoryItemShip';

const UserHistory = () => {
	const history = useHistory();
	const { user, userDetails } = useContext(AuthContext);
	const authorized = !!user.loggedIn;
	const [reservations, setReservations] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [rating, setRating] = useState<number>(0);

	useEffect(() => {
		loadReservations();
	}, []);

	const loadReservations = async () => {
		const resp = await getAllHistoryReservationsForUser(user.id);
		if (resp.status === HttpStatusCode.OK) {
			console.log(resp.data);
			setLoading(false);
			setReservations(resp.data);
		}
	};

	const goBack = () => {
		history.goBack();
	};

	const stars = [...new Array(5)];

	return (
		<div className='w-full flex bg-blue-50 flex-1 flex-col'>
			<div className='max-w-7xl self-center w-full pt-10 flex-1  flex flex-col'>
				<div>
					<div className='flex flex-row items-center'>
						<button className='flex flex-row items-center px-3 pt-1 w-28' onClick={goBack}>
							<LeftArrow className='' />
							<span className='ml-1'>Back</span>
						</button>
						<h1 className='text-2xl text-center flex-1'>User history</h1>
						<div className='w-28'></div>
					</div>
				</div>
				<div className='flex flex-col md:flex-row  flex-wrap mt-10'>
					{reservations.map((reservation: any, index: number) =>
						reservation.reservationType == 'LODGE' ? (
							<ReservationHistoryItemLodge key={index} reservation={reservation} index={index} />
						) : reservation.reservationType == 'SHIP' ? (
							<ReservationHistoryItemShip key={index} reservation={reservation} index={index} />
						) : (
							<ReservationHistoryItemLesson key={index} reservation={reservation} index={index} />
						)
					)}
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

export default UserHistory;
