import { Link } from 'react-router-dom';
import ReservationEntity from '../../model/reservation-entity';
import { ReservationEntityType } from '../../model/reservation-entity-type.enum';
import Search from '../Search';
import ReservationEntityDropdown from './ReservationEntityDropdown';

const ReservationEntities = (props: { reservationEntityType: ReservationEntityType; entities: ReservationEntity[] }) => {
	const addNewEntityButtonText = () => {
		switch (props.reservationEntityType) {
			case ReservationEntityType.LODGE:
				return 'Add new lodge';
			case ReservationEntityType.SHIP:
				return 'Add new ship';
			case ReservationEntityType.FISHING_LESSON:
				return 'Add new lesson';
			default:
				return '';
		}
	};

	return (
		<div className='flex flex-col flex-grow bg-gray-100 items-center'>
			<div className='flex flex-col flex-grow self-center items-center bg-white md:w-700px md:my-14 p-5 md:px-10 shadow-lg'>
				<Search />
				<div className='flex bg-gray-200 flex-col flex-grow w-full items-center mt-3 h-52 overflow-y-auto shadow-lg'>
					<ul className='w-full p-2'>
						{props.entities.map((entity: any) => (
							<li key={entity.id}>
								<div className='flex items-center bg-white shadow-lg w-full my-1 border-2 focus:border-blue-400' id={entity.id}>
									<div className='flex flex-grow justify-center p-1 '>
										<Link to={'/reservationEntities/' + entity.id} className='text-center hover:underline'>
											{entity.name}
										</Link>
									</div>
									<ReservationEntityDropdown entityId={entity.id} />
								</div>
							</li>
						))}
					</ul>
				</div>
				<Link className='btnBlueWhite mt-6 md: px-5' to={'/reservationNewEntity'}>
					{addNewEntityButtonText()}
				</Link>
			</div>
		</div>
	);
};

export default ReservationEntities;
