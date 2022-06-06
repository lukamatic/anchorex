import { StarIcon } from '@heroicons/react/solid';
import { format } from 'date-fns';
import { cloneElement, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../context/auth-context';
import LeftArrow from '../../icons/LeftArrow';
import { getAllHistoryReservationsForUser, getAllLodgesAsync, getAllReservationsForUser, getComplaintsFromUserAsync } from '../../server/service';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import ComplaintModal from '../modals/ComplaintModal';
import ReservationHistoryItem from './ReservationHistoryItem';

const UserComplaintsScreen = () => {
	const history = useHistory();
	const { user, userDetails } = useContext(AuthContext);
	const [complaints, setComplaints] = useState<any[]>([]);
	const [complaintModalVisible, setComplaintModalVisible] = useState<boolean>(false);
	const [oldReservations, setOldReservations] = useState<any[]>([]);

	const complaintIds = complaints.map((e: any) => e.reservationId);
	console.log(complaintIds);

	const usableReservations = oldReservations.filter((e: any) => !complaintIds.includes(e.reservationEntityId));

	useEffect(() => {
		loadOldReservations();
		loadComplaints();
	}, []);

	const loadOldReservations = async () => {
		const resp = await getAllReservationsForUser(user.id);
		if (resp.status === HttpStatusCode.OK) {
			console.log(resp.data);

			setOldReservations(resp.data);
		}
	};

	const loadComplaints = async () => {
		const resp = await getComplaintsFromUserAsync(user.id);
		if (resp.status === HttpStatusCode.OK) {
			setComplaints(resp.data);
		}
	};

	const goBack = () => {
		history.goBack();
	};

	const openNewComplaint = () => {
		setComplaintModalVisible(true);
	};
	const closeNewComplaint = () => {
		setComplaintModalVisible(false);
	};
	const successMakeComplaint = () => {
		loadComplaints();
		setComplaintModalVisible(false);
	};

	const getColor = (text: string) => {
		if (text === 'PENDING') return 'bg-yellow-200';
		else if (text === 'REJECTED') return 'bg-red-200';
		else return 'bg-green-200';
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
							<h1 className='text-2xl text-center flex-1'>User complaints</h1>
							<div className='w-28'></div>
						</div>
					</div>
					{/* {usableReservations.length > 0 && ( */}
					<div className='flex flex-row justify-center'>
						{usableReservations.length > 0 ? (
							<button
								onClick={openNewComplaint}
								className='px-3 py-2 bg-yellow-200 rounded-md 
						shadow-md hover:shadow-lg self-end w-72 mt-4 transform 
						hover:scale-105 transition-transform duration-120 font-semibold text-gray-600'
							>
								Create complaint
							</button>
						) : (
							<p className='text-gray-400 mt-5'>You cannot create any other complaint...</p>
						)}
					</div>
					<div className='flex flex-col md:flex-row  flex-wrap mt-10'>
						{complaints.map((complaint: any, index: number) => (
							<div key={index} className='w-1/3 px-4 py-2'>
								<div className='p-3 rounded-lg w-full bg-white mt-2 shadow-md  h-full flex flex-col'>
									<p className='text-gray-700 text-lg text-left '>{complaint.reservationName}</p>
									<div className='text-gray-400 text-xs text-left flex-1'>{complaint.comment}</div>
									<div
										className={`px-3 py-2 ${getColor(complaint.complaintStatus)} rounded-md 
									shadow-md  self-end w-full mt-4  font-semibold text-gray-600 text-center italic`}
									>
										Review status: {complaint?.complaintStatus}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<ComplaintModal isOpen={complaintModalVisible} onRequestClose={closeNewComplaint} successMakeComplaint={successMakeComplaint} oldReservations={usableReservations} />
		</>
	);
};

export default UserComplaintsScreen;
