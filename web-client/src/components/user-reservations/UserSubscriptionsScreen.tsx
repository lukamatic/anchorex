import { StarIcon } from '@heroicons/react/solid';
import { format } from 'date-fns';
import { cloneElement, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import AuthContext from '../../context/auth-context';
import LeftArrow from '../../icons/LeftArrow';
import { cancelSubscriptionAsync, getAllHistoryReservationsForUser, getAllLodgesAsync, getAllReservationsForUser, getComplaintsFromUserAsync, getUserSubscriptions } from '../../server/service';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import ComplaintModal from '../modals/ComplaintModal';
import ReservationHistoryItem from './ReservationHistoryItem';

const UserSubscriptionScreen = () => {
	const { addToast } = useToasts();
	const history = useHistory();
	const { user, userDetails } = useContext(AuthContext);
	const [subscriptions, setSubscriptions] = useState<any[]>([]);
	const [complaintModalVisible, setComplaintModalVisible] = useState<boolean>(false);
	const [oldReservations, setOldReservations] = useState<any[]>([]);

	useEffect(() => {
		loadSubscriptions();
	}, []);

	const loadSubscriptions = async () => {
		const resp = await getUserSubscriptions(user.id);
		if (resp.status === HttpStatusCode.OK) {
			console.log(resp.data);
			setSubscriptions(resp.data);
		}
	};

	const goBack = () => {
		history.goBack();
	};

	const cancelSubscriptionForReservation = async (id: number) => {
		const resp = await cancelSubscriptionAsync(id);
		if (resp.status == HttpStatusCode.OK) {
			loadSubscriptions();
			addToast('Action was successful! ', {
				appearance: 'success',
				autoDismiss: true,
			});
		}
	};

	return (
		<>
			<div className='w-full flex bg-blue-50 flex-1 flex-col'>
				<div className='max-w-7xl self-center w-full pt-10'>
					<div>
						<div className='flex flex-row items-center'>
							<button className='flex flex-row items-center px-3 pt-1 w-28' onClick={goBack}>
								<LeftArrow className='' />
								<span className='ml-1'>Back</span>
							</button>
							<h1 className='text-2xl text-center flex-1'>User subscriptions</h1>
							<div className='w-28'></div>
						</div>
					</div>

					<div className='flex flex-col md:flex-row  flex-wrap mt-10'>
						{subscriptions.map((e: any) => {
							const cancelSubscription = () => {
								cancelSubscriptionForReservation(e.id);
							};
							return (
								<div className='w-1/3 px-4 py-2' key={e.reservationId}>
									<div className='p-3 rounded-lg w-full bg-white mt-2 shadow-md  h-full flex flex-col'>
										<p className='text-gray-700 text-lg text-center '>{e?.reservationName}</p>
										<button
											className='px-3 py-2 bg-yellow-200 rounded-md 
													shadow-md hover:shadow-lg self-end w-full mt-4 transform 
													hover:scale-105 transition-transform duration-120 font-semibold text-gray-600'
											onClick={cancelSubscription}
										>
											Cancel subscription
										</button>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
};

export default UserSubscriptionScreen;
