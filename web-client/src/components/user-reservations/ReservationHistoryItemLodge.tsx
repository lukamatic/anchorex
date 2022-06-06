import { StarIcon } from '@heroicons/react/solid';
import { format } from 'date-fns';
import { cloneElement, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../context/auth-context';
import { makeRevisionAsync } from '../../server/service';
import { HttpStatusCode } from '../../utils/http-status-code.enum';

const ReservationHistoryItemLodge = (props: { reservation: any; index: number }) => {
	const history = useHistory();
	const { reservation } = props;
	const [createRevisionOpened, setCreateRevisionOpened] = useState<boolean>(false);
	const [rating, setRating] = useState<number>(0);
	const [commentMessage, setCommentMessage] = useState<string>('');
	const [reviewEnabled, setReviewEnabled] = useState<boolean>(!reservation?.revisionStatus);

	const { user, userDetails } = useContext(AuthContext);
	const lodgeInfo = reservation?.lodgeInfo;
	const location = lodgeInfo?.location;

	const goBack = () => {
		history.goBack();
	};

	const stars = [...new Array(5)];

	const submit = async () => {
		const data = {
			reservationId: reservation.reservationEntityId,
			userId: user.id,
			rating: rating + 1,
			comment: commentMessage,
		};

		const resp = await makeRevisionAsync(data);
		if (resp.status == HttpStatusCode.OK) {
			setCreateRevisionOpened(false);
			setRating(0);
			setCommentMessage('');
			setReviewEnabled(false);
		}
	};

	const getColor = (text: string) => {
		if (text === 'PENDING') return 'bg-yellow-200';
		else if (text === 'REJECTED') return 'bg-red-200';
		else return 'bg-green-200';
	};

	return (
		<div className='w-1/3 px-4 py-2' key={reservation.id}>
			<div className='p-3 rounded-lg w-full bg-white mt-2 shadow-md  h-full flex flex-col'>
				<div className='flex flex-col flex-1'>
					<p className='text-gray-700 text-lg text-left '>{lodgeInfo?.name}</p>
					<p className='text-gray-400 text-xs text-left flex-1'>{lodgeInfo?.description}</p>
					<p className='text-gray-500 text-xs text-left'>
						Address: {location?.address}, {location?.city}
					</p>
					<p className='text-gray-500 text-xs text-left'>Avg.score: {lodgeInfo.averageRating}</p>
					<div className='p-2 rounded-md border-2 border-solid border-blue-200 my-5 w-full'>
						<p className='text-gray-500 mb-0'>Services: </p>
						<p className='text-gray-300 mb-0 text-sm border-b border-solid border-blue-200 w-full pb-2'>Select from list below</p>
						{reservation.services?.map((service: any, index: number) => {
							const isSelected = false;

							return (
								<div key={index} className={`cursor-pointer flex flex-row items-center mt-2 ${isSelected ? '' : ''}`}>
									<span className='ml-2 text-gray-400'>{service.info}</span>
								</div>
							);
						})}
					</div>
					{!!reservation?.startDate && (
						<div className='flex flex-row justify-between text-gray-500 text-md'>
							📆{format(new Date(reservation?.startDate), 'dd. MMM')} - {format(new Date(reservation.endDate), 'dd. MMM yyyy.')}
						</div>
					)}
					<div className='flex flex-row justify-between items-center'>
						<p className='text-gray-500 text-md text-left'>👥 {reservation.maxPersonNumber}</p>
						<p className='text-gray-500 text-md text-left'>💸 ${reservation.price}</p>
					</div>
					{reviewEnabled && (
						<div>
							{createRevisionOpened ? (
								<div className='m-2 border-2 border-solid border-gray-200 rounded-md '>
									<p className='text-gray-600 text-xl text-center mt-5'>Create review</p>
									<div className='flex flex-row justify-around px-5 py-5 mt-5'>
										{stars.map((_, index) => {
											const selectedStar = index <= rating;

											return (
												<StarIcon
													color={selectedStar ? '#fce591' : '#d4d4d4'}
													height={30}
													width={30}
													key={index}
													className='cursor-pointer'
													onClick={() => {
														setRating(index);
													}}
												/>
											);
										})}
									</div>
									<div className='px-5'>
										<textarea
											className='input resize-none w-full h-40'
											maxLength={150}
											placeholder='Write your review...'
											onChange={(e: any) => {
												setCommentMessage(e.target.value);
											}}
										/>
									</div>
									<div className='flex flex-row'>
										<button
											className='px-3 py-2 border-solid border-2 border-yellow-200 rounded-md 
                                shadow-md  self-end w-full mt-4  font-semibold text-yellow-200 m-2'
											onClick={() => {
												setCreateRevisionOpened(false);
											}}
										>
											Cancel
										</button>
										<button
											className='px-3 py-2 bg-yellow-200 rounded-md  border-solid border-2 border-yellow-200
                                shadow-md  self-end w-full mt-4  font-semibold text-gray-600 m-2'
											onClick={submit}
										>
											Submit
										</button>
									</div>
								</div>
							) : (
								<div>
									<button
										className='px-3 py-2 bg-yellow-200 rounded-md 
                                shadow-md hover:shadow-lg self-end w-full mt-4 transform 
                                hover:scale-105 transition-transform duration-120 font-semibold text-gray-600'
										onClick={() => {
											setCreateRevisionOpened(true);
										}}
									>
										Create revision
									</button>
								</div>
							)}
						</div>
					)}
					{!!reservation?.revisionStatus && (
						<div
							className={`px-3 py-2 ${getColor(reservation?.revisionStatus)} rounded-md 
                        shadow-md  self-end w-full mt-4  font-semibold text-gray-600 text-center italic`}
						>
							Review status: {reservation?.revisionStatus}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ReservationHistoryItemLodge;
