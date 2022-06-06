function ListItem(item: any, numberOfDays: number = 2, numberOfPeopleBooking: number = 2, openModal: (item: any) => void, loyaltyProgram: any) {
	const location = item?.location;
	const numberOfPeople = item.doubleBedroomNumber * 2 + item?.fourBedroomNumber * 4 + item?.singleBedroomNumber;
	const discount = (loyaltyProgram?.discount ?? 0) / 100;
	const regularPrice = item.services
		.filter((e: any) => e.type === 'REGULAR')
		.map((e: any) => e.price)
		.reduce((a: number, b: number) => a + b, 0);
	const hasDiscount = discount > 0;
	const image = item?.images?.length > 0 ? item?.images[0]?.url : null;
	return (
		<div className='w-1/3 px-4 py-2' key={item.id}>
			<button
				className='p-3 rounded-lg w-full bg-white mt-24 shadow-md hover:shadow-2xl transition-transform duration-75 transform hover:scale-105 h-full flex flex-col'
				onClick={() => {
					openModal({ ...item, numberOfDays });
				}}
			>
				<div className=' overflow-hidden rounded-lg -mt-24  shadow-lg mb-2'>{!!image && <img src={image} alt='Item' className='object-cover h-52 w-full' />}</div>
				<div className='flex flex-col flex-1 w-full'>
					<p className='text-gray-700 text-lg text-left '>{item?.name}</p>
					<p className='text-gray-400 text-xs text-left flex-1'>{item?.description}</p>
					<p className='text-gray-500 text-xs text-left'>
						Address: {location?.address}, {location?.city}
					</p>
					<p className='text-gray-500 text-xs text-left'>Avg.score: {item.averageRating}</p>
					<div className='flex flex-row w-full'>
						<p className='text-gray-500 text-xs text-left flex-1'>👥 {numberOfPeople}</p>
						<p className={` text-xs text-left text-gray-500`}>
							💸 from <span className={` ${hasDiscount ? 'text-gray-400 line-through' : 'text-gray-500'}`}>${regularPrice * numberOfPeopleBooking * numberOfDays}</span>
							{hasDiscount && <span className={`text-gray-500 text-xs text-left`}> ${regularPrice * numberOfPeopleBooking * numberOfDays * (1 - discount)}</span>}
						</p>
					</div>
				</div>
			</button>
		</div>
	);
}

export default ListItem;
