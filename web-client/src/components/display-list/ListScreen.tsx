import { useEffect, useReducer } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { filterDto } from '../../dtos/search.dto';
import LeftArrow from '../../icons/LeftArrow';
import { addDays } from '../../utils/dateUtils';
import DatePicker from '../common/DatePicker';
import LiveSearch from '../common/LiveSearch';
import SelectDropdown from '../common/SelectDropdown';
import FilterContainer from './FilterContainer';
import ListItem from './ListItem';

const titleDict: any = {
	fishingLessons: 'Fishing lessons',
	ships: 'Ships',
	lodges: 'Lodges',
};

const ListScreen = () => {
	const history = useHistory();
	const { type }: { type: string } = useParams();
	const [state, setState] = useReducer((oldState: any, newState: any) => ({ ...oldState, ...newState }), {
		list: [],
		searchText: '',
		initialLoading: true,
		loadingMore: false,
		totalSize: -1,
		checkInDate: new Date(),
		checkOutDate: addDays(new Date(), 2),
		locations: ['Novi Sad', 'Beograd'],
		selectedLocations: [],
	});

	const { list, searchText, initialLoading, loadingMore, totalSize, checkInDate, checkOutDate, locations, selectedLocations } = state;

	useEffect(() => {
		loadDataAsync(type);
	}, [type]);

	const loadDataAsync = async (type: string) => {
		// TODO: Loading data async
		setTimeout(() => {}, 1000);
	};

	const goBack = () => {
		history.goBack();
	};

	const title = titleDict[type];

	const asyncSearch = (text: string) => {
		setState({ searchText: text });
	};
	const changeCheckInDate = (value: any) => {
		setState({ checkInDate: value });
	};
	const changeCheckOutDate = (value: any) => {
		setState({ checkOutDate: value });
	};

	const applyFilter = (filterModel: filterDto) => {};

	return (
		<div className='w-full flex bg-blue-50 flex-1 flex-col'>
			<div className='max-w-6xl self-center w-full pt-5  flex-1 flex flex-col'>
				<div>
					<div className='flex flex-row items-center'>
						<button className='flex flex-row items-center px-3 pt-1 w-28' onClick={goBack}>
							<LeftArrow className='' />
							<span className='ml-1'>Back</span>
						</button>
						<h1 className='text-2xl text-center flex-1'>{title}</h1>
						<div className='w-28'></div>
					</div>
				</div>
				<div className='flex flex-row flex-1 mt-4 overflow-y-auto'>
					<div className='mr-3 '>
						<div className='bg-blue-400 px-5 pb-7 pt-3 rounded-md mt-5 shadow-lg'>
							<h1 className='text-xl text-white mb-2 font-bold'>Search</h1>
							<div className='mb-2'>
								<LiveSearch value={searchText} callback={asyncSearch} />
							</div>
							<div>
								<p className='text-white'>Check-in date</p>
								<DatePicker placeholder='Select date' value={checkInDate} minDate={new Date()} onValueChange={changeCheckInDate} />
							</div>
							<div>
								<p className='text-white'>Check-out date</p>
								<DatePicker placeholder='Select date' value={checkOutDate} minDate={addDays(checkInDate, 1)} onValueChange={changeCheckOutDate} />
							</div>

							<button
								className='px-3 py-2 bg-yellow-200 rounded-md shadow-md hover:shadow-lg 
												self-end w-full mt-4 transform hover:scale-105 transition-transform duration-120 
													font-semibold text-gray-600'
							>
								Search
							</button>
						</div>
						<FilterContainer locations={locations} onApply={applyFilter} />
					</div>

					<div className='flex flex-col flex-1 '>
						<div className='flex flex-row justify-between '>
							<div className='flex-1'>{/* TODO: Badges / Applied filters */}</div>
							<div className='ml-3 pr-3 border-l-2 border-blue-300'></div>
							<div className=' flex flex-row items-center'>
								<label htmlFor='sort by' className='mr-2'>
									Sort by:
								</label>
								<SelectDropdown list={['']} value={'SortBy'} onChange={() => {}} />
							</div>
						</div>
						<div>{totalSize > 0 && list.map(ListItem)}</div>
						<div className='text-center flex-1 flex justify-center items-center'>{totalSize <= 0 && <div className='text-gray-400 '>{!searchText ? 'This list is currently empty...' : 'Search list is currently empty... Try another text'}</div>}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ListScreen;
