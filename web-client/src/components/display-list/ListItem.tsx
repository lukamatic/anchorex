function ListItem(item: any, numberOfDays: number = 2, numberOfPeopleBooking: number = 2, openModal: (item: any) => void) {
	const location = item?.location;
	const numberOfPeople = item.doubleBedroomNumber * 2 + item?.fourBedroomNumber * 4 + item?.singleBedroomNumber;
	const regularPrice = item.services
		.filter((e: any) => e.type === 'REGULAR')
		.map((e: any) => e.price)
		.reduce((a: number, b: number) => a + b, 0);
	return (
		<div className='w-1/3 px-4 py-2' key={item.id}>
			<button
				className='p-3 rounded-lg w-full bg-white mt-2 shadow-md hover:shadow-2xl transition-transform duration-75 transform hover:scale-105 h-full flex flex-col'
				onClick={() => {
					openModal({ ...item, numberOfDays });
				}}
			>
				<div className='flex flex-col flex-1'>
					<p className='text-gray-700 text-lg text-left '>{item?.name}</p>
					<p className='text-gray-400 text-xs text-left flex-1'>{item?.description}</p>
					<p className='text-gray-500 text-xs text-left'>
						Address: {location?.address}, {location?.city}
					</p>
					<p className='text-gray-500 text-xs text-left'>Avg.score: {item.averageRating}</p>
					<div className='flex flex-row justify-between'>
						<p className='text-gray-500 text-xs text-left'>👥 {numberOfPeople}</p>
						<p className='text-gray-500 text-xs text-left'>💸 from ${regularPrice * numberOfPeopleBooking * numberOfDays}</p>
					</div>
				</div>
			</button>
		</div>
	);
}

export default ListItem;
