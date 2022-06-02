import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import localStorageUtil from '../../utils/local-storage/local-storage-util';
import LoadingSpinner from '../common/LoadingSpinner';
import RejectionPopup from './RejectionPopup';

const ServiceSignupRequest = (props: { signupRequest: any; onApproveReject: () => void }) => {
	const history = useHistory();

	const [rejectionPopupVisible, setRejectionPopupVisible] = useState(false);
	const [fetching, setFetching] = useState(false);

	const approve = async () => {
		setFetching(true);

		const response = await fetch('/api/serviceSignupRequests/approve/' + props.signupRequest.id, {
			method: 'POST',
			headers: [['Authorization', 'Bearer ' + localStorageUtil.getAccessToken()]],
		});

		switch (response.status) {
			case HttpStatusCode.OK:
				props.signupRequest.status = 'APPROVED';
				props.onApproveReject();
				break;
			case HttpStatusCode.UNAUTHORIZED:
				history.push('/login');
				break;
			default:
				alert('Unknown error occurred.');
		}

		setFetching(false);
	};

	const toggleRejectionPopup = () => {
		setRejectionPopupVisible(!rejectionPopupVisible);
	};

	return (
		<div className='flex flex-col bg-white m-5 p-3 shadow-xl w-700px'>
			{rejectionPopupVisible && <RejectionPopup toggle={toggleRejectionPopup} signupRequest={props.signupRequest} onApproveReject={props.onApproveReject} />}
			<div className='flex items-center mb-2'>
				<p>Name:</p>
				<p className='ml-3 input'>{props.signupRequest.user.firstName + ' ' + props.signupRequest.user.lastName}</p>
			</div>
			<div className='flex items-center mb-2'>
				<p>Status:</p>
				<p className='ml-3 input'>{props.signupRequest.status}</p>
			</div>
			<p>Signup explanation:</p>
			<textarea className='input resize-none h-20 mx-7 mt-2 mb-1' value={props.signupRequest.signupExplanation} disabled={true} />
			{fetching ? (
				<LoadingSpinner />
			) : (
				<div>
					{props.signupRequest.status === 'PENDING' && (
						<div className='flex justify-end mt-2 pr-8'>
							<button className='btnBlueWhite' onClick={approve}>
								Approve
							</button>
							<button className='btnRedWhite ml-3' onClick={toggleRejectionPopup}>
								Reject
							</button>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default ServiceSignupRequest;
