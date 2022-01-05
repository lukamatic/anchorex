function ListItem(item: any) {
	return (
		<div className='w-1/3 px-4 py-2'>
			<button className='p-3 rounded-lg w-full bg-white mt-24 shadow-md hover:shadow-2xl transition-transform duration-75 transform hover:scale-105'>
				<div className=' overflow-hidden rounded-lg -mt-24  shadow-lg mb-2'>
					<img src={item.images[0].default} alt='Item' className='object-cover h-52 w-full' />
				</div>
				<div>
					<p className='text-gray-700 text-lg text-left'>{item.name}</p>
					<p className='text-gray-500 text-xs text-left'>{item.description}</p>
				</div>
			</button>
		</div>
	);
}

export default ListItem;
