/* This example requires Tailwind CSS v2.0+ */
import { useCallback, useState } from 'react';
import debounce from 'lodash.debounce';

const LiveSearch = (props: { value: string; callback: (text: string) => void }) => {
	const { value, callback } = props;
	const [search, setSearch] = useState(value);

	const changeHandler = (event: any) => {
		setSearch(event.target.value);
		callback(event.target.value);
	};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debouncedChangeHandler = useCallback(debounce(changeHandler, 500), []);

	return (
		<div className='flex flex-row justify-between w-full'>
			<input className='border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent flex-1 mr-8 rounded-md px-3 shadow-md py-1' placeholder='Search...' onChange={debouncedChangeHandler} />
		</div>
	);
};

export default LiveSearch;
