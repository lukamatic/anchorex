import { cloneElement, useEffect, useReducer } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import LeftArrow from '../../icons/LeftArrow';
import LiveSearch from '../common/LiveSearch';
import SearchWithSelect from '../common/SearchWithSelect';
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
	});

	const { list, searchText, initialLoading, loadingMore, totalSize } = state;

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
				<div className='mt-10'>
					<LiveSearch value={searchText} callback={asyncSearch} />
				</div>
				<div>
					<div>{/* TODO: Title */}</div>
					<div>{/* TODO: Filter */}</div>
				</div>
				<div>{totalSize > 0 && list.map(ListItem)}</div>
				<div className='text-center flex-1 flex justify-center items-center'>{totalSize <= 0 && <div className='text-gray-400 '>{!searchText ? 'This list is currently empty...' : 'Search list is currently empty... Try another text'}</div>}</div>
			</div>
		</div>
	);
};

export default ListScreen;
