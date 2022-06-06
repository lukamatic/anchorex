import { useEffect, useState } from 'react';
import { filterDto } from '../../dtos/search.dto';

const FilterContainerLessons = (props: { locations: Array<string>; onApply: (value: filterDto) => void; cancellationPercentage: [number, number] }) => {
	const { locations, onApply, cancellationPercentage } = props;

	const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
	const [minScore, setMinScore] = useState<number>(1);
	const [maxScore, setMaxScore] = useState<number>(5);
	const [selectedCancellationPercentage, setCancellationPercentage] = useState<[number, number]>([0, 0]);

	const [showingLocations, setShowingLocations] = useState<string[]>(locations.slice(0, 5));

	useEffect(() => {
		setShowingLocations(locations.slice(0, 5));
		setCancellationPercentage([...cancellationPercentage]);
	}, [locations]);

	const pressLocation = (location: string) => {
		let _selectedLocations: string[] = selectedLocations;
		const locationIndex = _selectedLocations.findIndex((e: string): boolean => e === location);
		if (locationIndex !== -1) _selectedLocations.splice(locationIndex, 1);
		else _selectedLocations.push(location);
		setSelectedLocations([..._selectedLocations]);
	};

	const locationItem = (location: string, index: number) => {
		const isSelectedLocation = selectedLocations!.includes(location);
		return (
			<div
				key={index}
				className={`px-2 py-1 bg-white rounded cursor-pointer my-1 text-sm text-gray-400  ${isSelectedLocation ? 'bg-blue-300 text-white' : ''}`}
				onClick={() => {
					pressLocation(location);
				}}
			>
				{location}
			</div>
		);
	};

	const showingAll = showingLocations.length === locations.length;

	const pressMoreLess = () => {
		if (showingAll) setShowingLocations(locations.slice(0, 5));
		else setShowingLocations(locations);
	};

	const showMoreLocationButton = showingLocations.length >= 5;

	const apply = () => {
		const applyData: filterDto = {
			locations: selectedLocations,
			score: {
				min: minScore,
				max: maxScore,
			},
			selectedEngineCount: [0, 100],
			selectedMaxSpeed: [0, 100],
			numberOfSingleRooms: [0, 100],
			numberOfDoubleRooms: [0, 100],
			numberOfFourRooms: [0, 100],
			cancellationPercentage: selectedCancellationPercentage,
		};

		onApply(applyData);
	};

	const updateNumberOfRooms = (func: (arg0: any) => void, values: [number, number], newValue: any, index: number) => {
		values[index] = parseInt(newValue.target.value);

		func([...values]);
	};

	return (
		<div className='mt-4 border-blue-400 border-2 px-5 pb-5 pt-3 rounded-md mb-2'>
			<h1 className='text-xl  mb-2 font-bold'>Filter by</h1>
			<div className='py-2'>
				<label htmlFor='Single room' className='text-gray-600'>
					Cancellation percentage
				</label>
				<div className='flex flex-row'>
					<div className='flex-1 flex flex-col'>
						<label htmlFor='' className='text-gray-600 text-sm pl-2'>
							Min
						</label>
						<input
							type='number'
							className='w-24 rounded-md px-3  py-1 text-sm'
							placeholder='Minimal score'
							value={selectedCancellationPercentage[0]}
							min={cancellationPercentage[0]}
							max={cancellationPercentage[1]}
							onChange={(e: any) => {
								updateNumberOfRooms(setCancellationPercentage, selectedCancellationPercentage, e, 0);
							}}
						/>
					</div>
					<div className='flex-1 flex flex-col'>
						<label htmlFor='' className='text-gray-700 opacity-0'>
							s
						</label>
						<label htmlFor='' className=' text-center text-gray-600 text-sm'>
							-
						</label>
					</div>
					<div className='flex-1 flex flex-col'>
						<label htmlFor='' className='text-gray-600 text-sm'>
							Max
						</label>
						<input
							type='number'
							className='w-24 rounded-md px-3  py-1 text-sm'
							placeholder='Maximum score'
							value={selectedCancellationPercentage[1]}
							min={cancellationPercentage[0]}
							max={cancellationPercentage[1]}
							onChange={(e: any) => {
								updateNumberOfRooms(setCancellationPercentage, selectedCancellationPercentage, e, 1);
							}}
						/>
					</div>
				</div>
			</div>
			<div className='py-2'>
				<p className='text-gray-700'>Location</p>
				<div className='flex flex-col'>
					{showingLocations.map(locationItem)}
					{showMoreLocationButton && (
						<button className='px-3 py-1 bg-yellow-200  rounded-md text-sm text-gray-600' onClick={pressMoreLess}>
							Show {showingAll ? 'less' : 'more'}
						</button>
					)}
				</div>
			</div>
			<button
				className='px-3 py-2 bg-yellow-200 rounded-md 
                            shadow-md hover:shadow-lg self-end w-full mt-4 transform 
                            hover:scale-105 transition-transform duration-120 font-semibold text-gray-600'
				onClick={apply}
			>
				Apply
			</button>
		</div>
	);
};

export default FilterContainerLessons;
