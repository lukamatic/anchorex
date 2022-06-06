import axios from 'axios';
import { format } from 'date-fns';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import Modal from 'react-modal';
import { useToasts } from 'react-toast-notifications';
import AuthContext from '../../context/auth-context';
import CheckCircleIcon from '../../icons/CheckCircleIcon';
import CheckCircleIconEmpty from '../../icons/CheckCircleIconEmpty';
import { makeComplaintAsync } from '../../server/service';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import { LocalStorageItem } from '../../utils/local-storage/local-storage-item.enum';
import LoadingSpinner from '../common/LoadingSpinner';

const ComplaintModal = (props: { isOpen: boolean; onRequestClose: () => void; successMakeComplaint: () => void; oldReservations: any[] }) => {
	const { addToast } = useToasts();
	const { user, userDetails } = useContext(AuthContext);
	const { isOpen, onRequestClose, successMakeComplaint, oldReservations } = props;
	const authContext = useContext(AuthContext);
	const [state, setState] = useReducer((oldState: any, newState: any) => ({ ...oldState, ...newState }), {
		comment: '',
		selectedReservation: null,
	});

	const { comment, selectedReservation } = state;

	useEffect(() => {
		if (isOpen) {
			setState({ selectedReservation: oldReservations[0] });
		}
	}, [isOpen]);

	const submitComplaint = async () => {
		const data = {
			userId: user.id,
			reservationId: selectedReservation.reservationEntityId,
			comment,
		};

		const resp = await makeComplaintAsync(data);
		if (resp.status == HttpStatusCode.OK) {
			addToast('Complaint has been made successfully! ', {
				appearance: 'success',
				autoDismiss: true,
			});
			successMakeComplaint();
		}
	};

	const selectReservation = (e: any) => {
		console.log(e);
	};

	return (
		<>
			{isOpen ? (
				<>
					<div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
						<div className='relative w-full my-2 mx-auto max-w-3xl'>
							{/*content*/}
							<div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none '>
								<div className='px-8 py-8'>
									{/*header*/}
									<div className='flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t'>
										<h3 className='text-3xl font-semibold'>Make complaint</h3>
										<button className='p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none' onClick={onRequestClose}>
											<span className='bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none'>×</span>
										</button>
									</div>
									<div className='flex flex-row'>
										<div></div>
									</div>
								</div>
								<div className='px-8'>
									<label htmlFor='' className='text-gray-500 text-sm  text-left'>
										Reservation
									</label>
									<select name='' id='' onChange={selectReservation}>
										{oldReservations.map((e: any, index: number) => (
											<option>{e.reservationName}</option>
										))}
									</select>
								</div>
								<div className='px-5'>
									<textarea
										className='input resize-none w-full h-40'
										maxLength={150}
										placeholder='Write your complain...'
										onChange={(e: any) => {
											setState({ comment: e.target.value });
										}}
									/>
								</div>
								<button
									className='px-3 py-2 bg-yellow-200 rounded-md 
                                shadow-md hover:shadow-lg self-end w-full mt-4 transform 
                                hover:scale-105 transition-transform duration-120 font-semibold text-gray-600'
									onClick={() => {
										submitComplaint();
									}}
								>
									Submit complain
								</button>
							</div>
						</div>
					</div>
					<div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
				</>
			) : null}
		</>
	);
};

export default ComplaintModal;
