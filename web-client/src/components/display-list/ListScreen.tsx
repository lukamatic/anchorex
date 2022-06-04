import { useEffect, useReducer } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import searchDto, { emptyFilterDto, filterDto } from '../../dtos/search.dto';
import LeftArrow from '../../icons/LeftArrow';
import { getAllFreePeriodsAsync, getAllLodgesAsync, getAllReservations, getPossibleLodges, searchDataAsync } from '../../server/service';
import { onlyUnique } from '../../utils/commonOps';
import { addDays } from '../../utils/dateUtils';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import DatePicker from '../common/DatePicker';
import LiveSearch from '../common/LiveSearch';
import LoadingSpinner from '../common/LoadingSpinner';
import SelectDropdown from '../common/SelectDropdown';
import ReservationModal from '../modals/ReservationModal';
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
		allItems: [],
		searchText: '',
		initialLoading: true,
		loadingMore: false,
		totalSize: -1,
		checkInDate: new Date(),
		checkOutDate: addDays(new Date(), 10),
		locations: [],
		currentFilterModel: emptyFilterDto,
		currentSortModel: null,
		sortOptions: ['Name 🔼', 'Name 🔽'],
		selectedSortOption: 'Name 🔽',
		numberOfSingleBedrooms: [0, 1],
		numberOfDoubleBedrooms: [0, 1],
		numberOfFourBedrooms: [0, 1],
		freePeriods: [],
		reservations: [],
		numberOfPeople: 2,
		modalOpened: false,
		selectedReservation: {},
	});

	const {
		list,
		allItems,
		searchText,
		initialLoading,
		loadingMore,
		totalSize,
		checkInDate,
		checkOutDate,
		locations,
		currentFilterModel,
		sortOptions,
		selectedSortOption,
		numberOfSingleBedrooms,
		numberOfDoubleBedrooms,
		numberOfFourBedrooms,
		freePeriods,
		reservations,
		numberOfPeople,
		modalOpened,
		selectedReservation,
	} = state;

	useEffect(() => {
		initLoad();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [type]);

	const initLoad = async () => {
		loadDataAsync(type);
	};

	const goBack = () => {
		history.goBack();
	};

	const title = titleDict[type];

	const openModal = (reservation: any) => {
		setState({ modalOpened: true, selectedReservation: { ...reservation, checkInDate, checkOutDate, numberOfPeople } });
	};

	const asyncSearch = (text: string) => {
		setState({ searchText: text });
	};
	const changeCheckInDate = (value: any) => {
		setState({ checkInDate: value });
	};
	const changeCheckOutDate = (value: any) => {
		setState({ checkOutDate: value });
	};

	const returnFilteredList = (filterModel: filterDto = currentFilterModel) => {
		let filteredList = [...allItems];
		if (filterModel.locations.length > 0) {
			const locations = filterModel.locations;

			filteredList = filteredList.filter((e: any) => locations.includes(e.location.city));
		}
		filteredList = filteredList.filter((e: any) => filterModel.numberOfSingleRooms[0] <= e.singleBedroomNumber && e.singleBedroomNumber <= filterModel.numberOfSingleRooms[1]);
		filteredList = filteredList.filter((e: any) => filterModel.numberOfDoubleRooms[0] <= e.singleBedroomNumber && e.doubleBedroomNumber <= filterModel.numberOfDoubleRooms[1]);
		filteredList = filteredList.filter((e: any) => filterModel.numberOfFourRooms[0] <= e.singleBedroomNumber && e.fourBedroomNumber <= filterModel.numberOfFourRooms[1]);
		return filteredList;
	};

	const applyFilter = (filterModel: filterDto) => {
		let filteredList = returnFilteredList(filterModel);
		setState({ currentFilterModel: filterModel, searchText: '' });
		doSort(selectedSortOption, filteredList);
	};

	const applySearch = () => {
		// const text = searchText.toLocaleLowerCase();
		// let filteredList = [...allItems]; //returnFilteredList();
		// filteredList = filteredList.filter((e: any) => e?.name?.toLowerCase()?.includes(text));
		// doSort(selectedSortOption, filteredList);
		// setState({ list: filteredList });
		loadDataAsync();
	};

	const getMinMax = (array: number[]) => {
		return [Math.min(...array), Math.max(...array)];
	};

	const loadDataAsync = async (t?: string) => {
		setState({
			initialLoading: true,
		});
		const data = {
			startDate: checkInDate,
			endDate: checkOutDate,
			numberOfPeople: numberOfPeople,
		};
		const resp = await getPossibleLodges(data);

		if (resp.status === HttpStatusCode.OK) {
			const filteredLocations = resp.data.map((e: any) => e?.location?.city).filter(onlyUnique);
			const numberOfSingleBedrooms = resp.data.map((e: any) => e.singleBedroomNumber);
			const numberOfDoubleBedrooms = resp.data.map((e: any) => e.doubleBedroomNumber);
			const numberOfFourBedrooms = resp.data.map((e: any) => e.fourBedroomNumber);

			doSort(selectedSortOption, resp.data);
			setState({
				// list: resp.data,
				allItems: [...resp.data],
				totalSize: resp.data.length,
				initialLoading: false,
				locations: filteredLocations,
				numberOfSingleBedrooms: getMinMax(numberOfSingleBedrooms),
				numberOfDoubleBedrooms: getMinMax(numberOfDoubleBedrooms),
				numberOfFourBedrooms: getMinMax(numberOfFourBedrooms),
			});
			return resp.data;
		} else {
			setState({
				initialLoading: false,
			});
		}
		return [];
	};

	const doSort = (e: string, array: any[]) => {
		const order = e.includes('🔼') ? 1 : -1;
		const items = array.sort((a: any, b: any) => (a.name > b.name ? order * -1 : order));
		setState({ list: items });
	};

	const numberOfDays = new Date(checkOutDate - checkInDate).getDate();

	const closeModal = () => {
		setState({ modalOpened: false });
	};
	const successBook = () => {
		loadDataAsync();
		setState({ modalOpened: false });
	};

	return (
		<>
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
								<h1 className='text-xl text-white mb-2 font-bold'>Pick a period</h1>
								{/* <div className='mb-2'>
								<LiveSearch value={searchText} callback={asyncSearch} />
							</div> */}
								<div>
									<p className='text-white'>Check-in date</p>
									<DatePicker placeholder='Select date' value={checkInDate} minDate={new Date()} onValueChange={changeCheckInDate} />
								</div>
								<div>
									<p className='text-white'>Check-out date</p>
									<DatePicker placeholder='Select date' value={checkOutDate} minDate={addDays(checkInDate, 1)} onValueChange={changeCheckOutDate} />
								</div>
								<div className='flex-1 flex flex-col'>
									<label htmlFor='' className='text-white'>
										Number of people
									</label>
									<input
										type='number'
										className='w-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
										placeholder='Number of people'
										value={numberOfPeople}
										min={0}
										max={100}
										onChange={(e: any) => {
											setState({ numberOfPeople: parseInt(e.target.value) });
										}}
									/>
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
							<FilterContainer locations={locations} onApply={applyFilter} numberOfSingleBedrooms={numberOfSingleBedrooms} numberOfDoubleBedrooms={numberOfDoubleBedrooms} numberOfFourBedrooms={numberOfFourBedrooms} />
						</div>

						<div className='flex flex-col flex-1 '>
							<div className='flex flex-row justify-between '>
								<div className='flex-1'>{/* TODO: Badges / Applied filters */}</div>
								{/* <div className='ml-3 pr-3 border-l-2 border-blue-300'></div> */}
								<div className=' flex flex-row items-center'>
									<label htmlFor='sort by' className='mr-2'>
										Sort by:
									</label>
									<SelectDropdown
										list={sortOptions}
										value={selectedSortOption}
										onChange={(e: string) => {
											doSort(e, list);
											setState({ selectedSortOption: e });
										}}
									/>
								</div>
							</div>
							<div className='flex flex-row flex-wrap'>{list.length > 0 && list?.map((e: any) => ListItem(e, numberOfDays, numberOfPeople, openModal))}</div>
							{totalSize <= 0 && !initialLoading && (
								<div className='text-center flex-1 flex justify-center items-center'>
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
			<ReservationModal isOpen={modalOpened} onRequestClose={closeModal} reservation={selectedReservation} successBook={successBook} />
		</>
	);
};

export default ListScreen;
