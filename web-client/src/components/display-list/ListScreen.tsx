import { useEffect, useReducer } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import searchDto, { filterDto } from '../../dtos/search.dto';
import LeftArrow from '../../icons/LeftArrow';
import { searchDataAsync } from '../../server/service';
import { addDays } from '../../utils/dateUtils';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import DatePicker from '../common/DatePicker';
import LiveSearch from '../common/LiveSearch';
import LoadingSpinner from '../common/LoadingSpinner';
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
		currentFilterModel: null,
		currentSortModel: null,
	});

	const { list, searchText, initialLoading, loadingMore, totalSize, checkInDate, checkOutDate, locations, currentFilterModel, currentSortModel } = state;

	useEffect(() => {
		loadDataAsync(type);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [type]);

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

	const applyFilter = (filterModel: filterDto) => {
		setState({ currentFilterModel: filterModel });
	};

	const applySearch = () => {
		loadDataAsync(type);
	};

	const loadDataAsync = async (type: string, offset: number = list.length) => {
		const searchData: searchDto = {
			searchText,
			checkIn: checkInDate,
			checkOut: checkOutDate,
			sort: currentSortModel,
			filter: currentFilterModel,
			type,
			pagination: {
				limit: 20,
				offset,
			},
		};
		const resp = await searchDataAsync(searchData);
		if (resp.status === HttpStatusCode.OK) {
			const data = resp.data;
			const previousList = offset === 0 ? [] : [...list];
			setState({
				list: [...previousList, ...data.list],
				totalSize: data.size,
				initialLoading: false,
				loadingMore: false,
			});
		} else {
			setState({
				initialLoading: false,
			});
		}
	};

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
								onClick={applySearch}
							>
								Search
							</button>
						</div>
						<FilterContainer locations={locations} onApply={applyFilter} />
					</div>

					<div className='flex flex-col flex-1 '>
						<div className='flex flex-row justify-between '>
							<div className='flex-1'>{/* TODO: Badges / Applied filters */}</div>
							{/* <div className='ml-3 pr-3 border-l-2 border-blue-300'></div> */}
							<div className=' flex flex-row items-center'>
								<label htmlFor='sort by' className='mr-2'>
									Sort by:
								</label>
								<SelectDropdown list={['']} value={'SortBy'} onChange={() => {}} />
							</div>
						</div>
						<div>{totalSize > 0 && list.map(ListItem)}</div>
						{totalSize <= 0 && !initialLoading && (
							<div className='text-center flex-1 flex justify-center items-center'>
								{' '}
								<div className='text-gray-400 '>{!searchText ? 'This list is currently empty...' : 'Search list is currently empty... Try another text'}</div>
							</div>
						)}
						{initialLoading && (
							<div className='flex flex-1 justify-center items-center'>
								<LoadingSpinner />
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ListScreen;
