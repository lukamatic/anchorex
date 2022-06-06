import axios from 'axios';
import { format } from 'date-fns';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import Modal from 'react-modal';
import { useToasts } from 'react-toast-notifications';
import AuthContext from '../../context/auth-context';
import CheckCircleIcon from '../../icons/CheckCircleIcon';
import CheckCircleIconEmpty from '../../icons/CheckCircleIconEmpty';
import CloseBookmarkIcon from '../../icons/CloseBookmarkIcon';
import OpenBookmarkIcon from '../../icons/OpenBookmarkIcon';
import { createSubscriptionAsync, getQuickActionsAsync, getUserSubscriptions } from '../../server/service';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import { LocalStorageItem } from '../../utils/local-storage/local-storage-item.enum';
import LoadingSpinner from '../common/LoadingSpinner';

const ReservationModal = (props: { isOpen: boolean; onRequestClose: () => void; reservation: any; successBook: () => void }) => {
	const { addToast } = useToasts();

	const { isOpen, onRequestClose, reservation: rawReservation, successBook } = props;
	const authContext = useContext(AuthContext);
	const [state, setState] = useReducer((oldState: any, newState: any) => ({ ...oldState, ...newState }), {
		reservation: rawReservation,
		loading: false,
		additionalCost: 0,
		selectedAdditionalServices: [],
		quickActions: [],
		subscribed: false,
	});

	const { reservation, loading, additionalCost, selectedAdditionalServices, quickActions, subscribed } = state;

	useEffect(() => {
		if (isOpen) {
			setState({
				reservation: rawReservation,
				loading: false,
			});
			loadSubscriptions();
			loadQuickActions();
		} else {
			setState({
				additionalCost: 0,
				selectedAdditionalServices: [],
				quickActions: [],
			});
		}
	}, [reservation.id, isOpen]);

	const sumArr = (arr: number[]) => arr.reduce((a: number, b: number) => a + b, 0);

	const loadQuickActions = async () => {
		const resp = await getQuickActionsAsync(reservation.id);
		if (resp.status == HttpStatusCode.OK) {
			setState({ quickActions: resp.data });
		}
	};
	const loadSubscriptions = async () => {
		const resp = await getUserSubscriptions(reservation.id);
		if (resp.status == HttpStatusCode.OK) {
			const subscriptions = resp.data;
			const subscribed = subscriptions.map((e: any) => e.reservationId).includes(reservation.id);
			console.log(`Subscribed: ${subscribed}`);

			setState({ subscribed });
		}
	};

	const selectAdditionalService = (service: any) => {
		let services = [...selectedAdditionalServices];
		const index = selectedAdditionalServices.findIndex((s: any) => s.id === service.id);
		if (index != -1) services.splice(index, 1);
		else services.push(service);

		setState({
			selectedAdditionalServices: services,
			additionalCost: sumArr(services.map((e: any) => e.price)),
		});
	};

	const location = reservation?.location;
	// const numberOfPeople = reservation?.doubleBedroomNumber * 2 + reservation?.fourBedroomNumber * 4 + reservation?.singleBedroomNumber;

	const regularPrice = reservation?.services
		?.filter((e: any) => e.type === 'REGULAR')
		?.map((e: any) => e.price)
		?.reduce((a: number, b: number) => a + b, 0);

	const numberOfDays = reservation?.numberOfDays;
	const checkInDate = reservation?.checkInDate;
	const checkOutDate = reservation?.checkOutDate;
	const additionalServices = reservation?.services?.filter((e: any) => e.type === 'ADDITIONAL');
	const selectedServicesIds = selectedAdditionalServices.map((e: any) => e.id);
	const numberOfPeopleToBook = reservation?.numberOfPeople || 1;

	const additionServiceContainer = () => (
		<div className='p-2 rounded-md border-2 border-solid border-blue-200 mt-5 w-80'>
			<p className='text-gray-500 mb-0'>Additional services: </p>
			<p className='text-gray-300 mb-0 text-sm border-b border-solid border-blue-200 w-full pb-2'>Select from list below</p>
			{additionalServices?.map((service: any, index: number) => {
				const isSelected = selectedServicesIds.includes(service.id);
				const selectThisService = () => {
					selectAdditionalService(service);
				};

				return (
					<div key={index} className={`cursor-pointer flex flex-row items-center mt-2 ${isSelected ? '' : ''}`} onClick={selectThisService}>
						{isSelected ? <CheckCircleIcon /> : <CheckCircleIconEmpty />}

						<span className='ml-2 text-gray-400 flex-1'>{service.info}</span>
						<span className='ml-2 text-gray-300 text-xs'>${service.price * numberOfPeopleToBook * numberOfDays}</span>
					</div>
				);
			})}
		</div>
	);
	const quickActionsContainer = () => (
		<div className='p-2 rounded-md border-2 border-solid border-blue-200 mt-5 w-80'>
			<p className='text-gray-500 mb-0'>Quick actions </p>
			<p className='text-gray-300 mb-0 text-sm border-b border-solid border-blue-200 w-full pb-2'>See some discount</p>
			{quickActions?.map((action: any, index: number) => {
				const checkInDate = action.startDate;
				const checkOutDate = action.endDate;
				const oldPrice = action.price * (1 / (1 - action.discount));
				return (
					<div
						key={index}
						className={`cursor-pointer flex flex-col mt-2 bg-blue-100 rounded-sm p-2`}
						onClick={() => {
							takeQuickReservation(action);
						}}
					>
						<div className='flex flex-row justify-between items-end'>
							<span className='text-gray-400'>
								{format(new Date(checkInDate), 'dd. MMM')} - {format(new Date(checkOutDate), 'dd. MMM yyyy.')}
							</span>
							<span className='text-gray-400 text-xs line-through'>Old price: {oldPrice}</span>
						</div>
						<div className='flex flex-row justify-between items-center'>
							<span className='text-gray-400'>👥 : {action.maxPersonNumber}</span>
							<span className='text-gray-400'>Price: {action.price}</span>
						</div>
					</div>
				);
			})}
		</div>
	);

	const takeQuickReservation = async (action: any) => {
		const data = {
			...action,
			userId: authContext.user.id,
		};
		setState({
			loading: true,
		});

		// console.log(data);
		// return;

		axios
			.put('/api/reservation/takeQuickAction', data, {
				headers: {
					Accept: 'application/json',
					'Content-type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem(LocalStorageItem.ACCESS_TOKEN),
				},
			})
			.then((response) => {
				if (response.status === HttpStatusCode.CREATED) {
					setState({
						loading: false,
					});
					addToast('Reservation has been made successfully! ', {
						appearance: 'success',
						autoDismiss: true,
					});
					successBook();
				}
			})
			.catch((error) => {
				if (error.status === HttpStatusCode.NOT_ACCEPTABLE) {
					window.alert('There are no free periods for this action!');
				}
			});
	};

	const bookReservation = async () => {
		const price = numberOfDays * numberOfPeopleToBook * (regularPrice + additionalCost);
		const data = {
			startDate: checkInDate,
			endDate: checkOutDate,
			maxPersonNumber: numberOfPeopleToBook,
			discount: 0,
			price,
			services: [...reservation?.services?.filter((e: any) => e.type === 'REGULAR'), ...selectedAdditionalServices],
			reservationEntityId: reservation.id,
			userId: authContext.user.id,
		};
		setState({
			loading: true,
		});
		axios
			.post('/api/reservation/createPersonalReservation', data, {
				headers: {
					Accept: 'application/json',
					'Content-type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem(LocalStorageItem.ACCESS_TOKEN),
				},
			})
			.then((response) => {
				if (response.status === HttpStatusCode.CREATED) {
					setState({
						loading: false,
					});
					addToast('Reservation has been made successfully! ', {
						appearance: 'success',
						autoDismiss: true,
					});
					successBook();
				}
			})
			.catch((error) => {
				if (error.status === HttpStatusCode.NOT_ACCEPTABLE) {
					window.alert('There are no free periods for this action!');
				}
			});
	};

	const subscribe = async () => {
		const data = {
			userId: authContext.user.id,
			reservationId: reservation.id,
		};

		console.log(data);

		const resp = await createSubscriptionAsync(data);
		if (resp.status == HttpStatusCode.CREATED) {
			addToast('Subscription has been made successfully! ', {
				appearance: 'success',
				autoDismiss: true,
			});
			setState({ subscribed: true });
		}
	};

	return (
		<>
			{isOpen ? (
				<>
					<div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
						<div className='relative w-full my-2 mx-auto max-w-4xl'>
							{/*content*/}
							<div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none '>
								<div className='px-8 py-8'>
									{/*header*/}
									<div className='flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t'>
										<h3 className='text-3xl font-semibold'>{reservation?.name}</h3>
										<div className='flex flex-row items-end'>
											{subscribed ? (
												<CloseBookmarkIcon className='text-blue-300' />
											) : (
												<button className='text-blue-300 text-sm' onClick={subscribe}>
													<OpenBookmarkIcon className='color-red-100' />
												</button>
											)}
											<button className='p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none' onClick={onRequestClose}>
												<span className='bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none'>×</span>
											</button>
										</div>
									</div>
									<div className='flex flex-row'>
										<div className='flex flex-col flex-1'>
											<p className='text-gray-400  text-left flex-1'>{reservation?.description}</p>
											<p className='text-gray-500  text-left'>
												Address: {location?.address}, {location?.city}
											</p>
											<p className='text-gray-500  text-left'>Avg.score: {reservation.averageRating}</p>
										</div>
										<div>
											{additionServiceContainer()}
											{!!quickActions.length && quickActionsContainer()}
										</div>
									</div>
								</div>
								<div className='px-8'>
									<label htmlFor='' className='text-gray-500 text-sm  text-left'>
										Rules of conduct:{' '}
									</label>
									<label htmlFor='' className='text-gray-400 text-sm  text-left'>
										{reservation?.rulesOfConduct?.split('#')?.splice(1, 100)?.join(',')}
									</label>
								</div>
								<div className='flex flex-row justify-between bg-blue-300 rounded-md items-center pl-4'>
									<div className='flex flex-col'>
										{!!checkInDate && (
											<label htmlFor='' className='text-gray-600 text-xl'>
												Period:{' '}
												<span className='text-gray-500 font-bold'>
													{format(checkInDate, 'dd. MMM')} - {format(checkOutDate, 'dd. MMM yyyy.')}
												</span>
											</label>
										)}
										{regularPrice && (
											<label htmlFor='' className='text-gray-600 text-xl'>
												Price:
												<span className='text-gray-500 font-bold'> ${numberOfDays * numberOfPeopleToBook * (regularPrice + additionalCost)}</span>
											</label>
										)}
									</div>
									<div className='p-4'>
										{loading ? (
											<div className='flex justify-center items-center mb-3'>
												<LoadingSpinner />
											</div>
										) : (
											<button
												className='px-3 py-2 bg-yellow-200 rounded-md 
                        shadow-md hover:shadow-lg self-end transform 
                        hover:scale-105 transition-transform duration-120 font-semibold text-gray-600'
												onClick={bookReservation}
											>
												BOOK
											</button>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
				</>
			) : null}
		</>
	);
};

export default ReservationModal;
