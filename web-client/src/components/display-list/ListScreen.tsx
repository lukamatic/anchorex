import { useContext, useEffect, useReducer } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import AuthContext from '../../context/auth-context';
import searchDto, { emptyFilterDto, filterDto } from '../../dtos/search.dto';
import LeftArrow from '../../icons/LeftArrow';
import { getAllFishingLessonsAsync, getAllFreePeriodsAsync, getAllLodgesAsync, getAllReservations, getAllShipsAsync, getLoyaltyInfoAsync, getPossibleLessons, getPossibleLodges, getPossibleShips, httpResponse, searchDataAsync } from '../../server/service';
import { onlyUnique } from '../../utils/commonOps';
import { addDays } from '../../utils/dateUtils';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import DatePicker from '../common/DatePicker';
import LiveSearch from '../common/LiveSearch';
import LoadingSpinner from '../common/LoadingSpinner';
import SelectDropdown from '../common/SelectDropdown';
import ReservationModal from '../modals/ReservationModal';
import FilterContainer from './FilterContainer';
import FilterContainerLessons from './FilterContainerLessons';
import FilterContainerShips from './FilterContainerShips';
import ListItem from './ListItem';

const titleDict: any = {
	fishingLessons: 'Fishing lessons',
	ships: 'Ships',
	lodges: 'Lodges',
};

const ListScreen = () => {
	const history = useHistory();
	const authContext = useContext(AuthContext);
	const authorized = !!authContext.user.loggedIn;
	const { type }: { type: 'ships' | 'lodges' | 'fishingLessons' } = useParams();
	const [state, setState] = useReducer((oldState: any, newState: any) => ({ ...oldState, ...newState }), {
		list: [],
		allItems: [],
		searchText: '',
		initialLoading: true,
		loadingMore: false,
		totalSize: -1,
		checkInDate: new Date(),
		checkOutDate: addDays(new Date(), authorized ? 10 : 1),
		locations: [],
		currentFilterModel: emptyFilterDto,
		currentSortModel: null,
		sortOptions: ['Name 🔼', 'Name 🔽', 'City 🔼', 'City 🔽', 'Address 🔼', 'Address 🔽'],
		selectedSortOption: 'Name 🔽',
		numberOfSingleBedrooms: [0, 1],
		numberOfDoubleBedrooms: [0, 1],
		numberOfFourBedrooms: [0, 1],
		cancellationPercentages: [0, 1],
		maxSpeeds: [0, 1],
		engineCounts: [0, 1],
		freePeriods: [],
		reservations: [],
		numberOfPeople: 2,
		modalOpened: false,
		selectedReservation: {},
		loyaltyProgram: {},
		numberOfCountedPeople: 2,
	});

	const {
		cancellationPercentages,
		maxSpeeds,
		engineCounts,
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
		loyaltyProgram,
		numberOfCountedPeople,
	} = state;

	useEffect(() => {
		initLoad();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [type]);

	const getAllLodges = async () => {
		const resp = await getAllLodgesAsync();
		if (resp.status == HttpStatusCode.OK) {
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
				numberOfCountedPeople: numberOfPeople,
			});
		}
	};

	const getAllShips = async () => {};
	const getAllFishingLessons = async () => {};

	const unauthorizedFetchFunctions: {
		ships: () => void;
		lodges: () => void;
		fishingLessons: () => void;
	} = {
		ships: getAllShips,
		lodges: getAllLodges,
		fishingLessons: getAllFishingLessons,
	};

	const initLoad = async () => {
		if (authorized) {
			loadDataAsync();
			loadUserLoyaltyInfo();
		} else loadDataUnauthorized();
	};

	const loadDataUnauthorized = async () => {
		unauthorizedFetchFunctions[type]();
	};

	const loadUserLoyaltyInfo = async () => {
		const resp = await getLoyaltyInfoAsync();
		if (resp.status === HttpStatusCode.OK) {
			console.log(resp.data);
			setState({ loyaltyProgram: resp.data });
		}
	};

	const goBack = () => {
		history.goBack();
	};

	const title = titleDict[type];

	const openModal = (reservation: any) => {
		setState({ modalOpened: true, selectedReservation: { ...reservation, checkInDate, checkOutDate, numberOfPeople: numberOfCountedPeople } });
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
		if (type == 'lodges') {
			filteredList = filteredList.filter((e: any) => filterModel?.numberOfSingleRooms[0] <= e.singleBedroomNumber && e.singleBedroomNumber <= filterModel.numberOfSingleRooms[1]);
			filteredList = filteredList.filter((e: any) => filterModel?.numberOfDoubleRooms[0] <= e.singleBedroomNumber && e.doubleBedroomNumber <= filterModel.numberOfDoubleRooms[1]);
			filteredList = filteredList.filter((e: any) => filterModel?.numberOfFourRooms[0] <= e.singleBedroomNumber && e.fourBedroomNumber <= filterModel.numberOfFourRooms[1]);
		} else if (type == 'ships') {
			filteredList = filteredList.filter((e: any) => filterModel?.selectedMaxSpeed[0] <= e.maxSpeed && e.maxSpeed <= filterModel.selectedMaxSpeed[1]);
			filteredList = filteredList.filter((e: any) => filterModel?.selectedEngineCount[0] <= e.engineCount && e.engineCount <= filterModel.selectedEngineCount[1]);
		}
		return filteredList;
	};

	const applyFilter = (filterModel: filterDto) => {
		let filteredList = returnFilteredList(filterModel);
		setState({ currentFilterModel: filterModel, searchText: '' });
		doSort(selectedSortOption, filteredList);
	};

	const applySearch = () => {
		loadDataAsync();
	};

	const getMinMax = (array: number[]) => {
		return [Math.min(...array), Math.max(...array)];
	};

	const loadDataAsync = async () => {
		authorizedFetchFunctions[type]();
	};

	const doSort = (e: string, array: any[]) => {
		if (e.includes('Name')) {
			const order = e.includes('🔼') ? 1 : -1;
			const items = array.sort((a: any, b: any) => (a.name > b.name ? order * -1 : order));
			setState({ list: items });
		} else if (e.includes('City')) {
			const order = e.includes('🔼') ? 1 : -1;
			const items = array.sort((a: any, b: any) => (a?.location?.city > b?.location?.city ? order * -1 : order));
			setState({ list: items });
		} else if (e.includes('Address')) {
			const order = e.includes('🔼') ? 1 : -1;
			const items = array.sort((a: any, b: any) => (a?.location?.address > b?.location?.address ? order * -1 : order));
			setState({ list: items });
		}
	};

	const numberOfDays = new Date(checkOutDate - checkInDate).getDate();

	const closeModal = () => {
		setState({ modalOpened: false });
	};
	const successBook = () => {
		loadDataAsync();
		setState({ modalOpened: false });
	};

	const getAuthLodgesAsync = async () => {
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
			console.log(resp.data);

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
				numberOfCountedPeople: numberOfPeople,
			});
			return resp.data;
		} else {
			setState({
				initialLoading: false,
			});
		}
		return [];
	};
	const getAuthFishingLessonsAsync = async () => {
		setState({
			initialLoading: true,
		});
		const data = {
			startDate: checkInDate,
			endDate: checkOutDate,
			numberOfPeople: numberOfPeople,
		};
		const resp = await getPossibleLessons(data);

		if (resp.status === HttpStatusCode.OK) {
			const filteredLocations = resp.data.map((e: any) => e?.location?.city).filter(onlyUnique);
			const cancellationPercentages = resp.data.map((e: any) => e.cancellationPercentage);

			doSort(selectedSortOption, resp.data);
			setState({
				// list: resp.data,
				allItems: [...resp.data],
				totalSize: resp.data.length,
				initialLoading: false,
				locations: filteredLocations,
				cancellationPercentages: getMinMax(cancellationPercentages),

				numberOfCountedPeople: numberOfPeople,
			});
			return resp.data;
		} else {
			setState({
				initialLoading: false,
			});
		}
		return [];
	};
	const getAuthShipsAsync = async () => {
		setState({
			initialLoading: true,
		});
		const data = {
			startDate: checkInDate,
			endDate: checkOutDate,
			numberOfPeople: numberOfPeople,
		};
		const resp = await getPossibleShips(data);

		if (resp.status === HttpStatusCode.OK) {
			const filteredLocations = resp.data.map((e: any) => e?.location?.city).filter(onlyUnique);
			const engineCount = resp.data.map((e: any) => e.engineCount);
			const maxSpeeds = resp.data.map((e: any) => e.maxSpeed);

			doSort(selectedSortOption, resp.data);
			setState({
				// list: resp.data,
				allItems: [...resp.data],
				totalSize: resp.data.length,
				initialLoading: false,
				locations: filteredLocations,
				engineCounts: getMinMax(engineCount),
				maxSpeeds: getMinMax(maxSpeeds),
				numberOfCountedPeople: numberOfPeople,
			});
			return resp.data;
		} else {
			setState({
				initialLoading: false,
			});
		}
		return [];
	};

	const authorizedFetchFunctions: { ships: () => void; lodges: () => void; fishingLessons: () => void } = {
		ships: getAuthShipsAsync,
		lodges: getAuthLodgesAsync,
		fishingLessons: getAuthFishingLessonsAsync,
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
							{authorized && (
								<div className='bg-blue-400 px-5 pb-7 pt-3 rounded-md mt-5 shadow-lg'>
									<h1 className='text-xl text-white mb-2 font-bold'>Pick a period</h1>
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
							)}
							{type == 'lodges' && <FilterContainer locations={locations} onApply={applyFilter} numberOfSingleBedrooms={numberOfSingleBedrooms} numberOfDoubleBedrooms={numberOfDoubleBedrooms} numberOfFourBedrooms={numberOfFourBedrooms} />}
							{type == 'fishingLessons' && <FilterContainerLessons locations={locations} onApply={applyFilter} cancellationPercentage={cancellationPercentages} />}
							{type == 'ships' && <FilterContainerShips locations={locations} onApply={applyFilter} maxSpeed={maxSpeeds} engineCount={engineCounts} />}
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
							<div className='flex flex-row flex-wrap'>{list.length > 0 && list?.map((e: any) => ListItem(e, numberOfDays, numberOfCountedPeople, openModal, loyaltyProgram, type))}</div>
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
			{modalOpened && <ReservationModal isOpen={modalOpened} onRequestClose={closeModal} reservation={selectedReservation} successBook={successBook} />}
		</>
	);
};

export default ListScreen;
