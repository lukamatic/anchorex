/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useReducer, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import SelectDropdown from './SelectDropdown';

const people = [
	{
		id: 1,
		name: 'Wade Cooper',
		avatar: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
	{
		id: 2,
		name: 'Arlene Mccoy',
		avatar: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
	{
		id: 3,
		name: 'Devon Webb',
		avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
	},
	{
		id: 4,
		name: 'Tom Cook',
		avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
	{
		id: 5,
		name: 'Tanya Fox',
		avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
	{
		id: 6,
		name: 'Hellen Schmidt',
		avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
	{
		id: 7,
		name: 'Caroline Schultz',
		avatar: 'https://images.unsplash.com/photo-1568409938619-12e139227838?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
	{
		id: 8,
		name: 'Mason Heaney',
		avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
	{
		id: 9,
		name: 'Claudie Smitham',
		avatar: 'https://images.unsplash.com/photo-1584486520270-19eca1efcce5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
	{
		id: 10,
		name: 'Emil Schaefer',
		avatar: 'https://images.unsplash.com/photo-1561505457-3bcad021f8ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
];

const classNames = (...classes: any) => {
	return classes.filter(Boolean).join(' ');
};

export default function SearchWithSelect() {
	const selectList = ['All', 'Fishing lessons', 'Ships', 'Lodges'];
	const [state, setState] = useReducer((oldState: any, newState: any) => ({ ...oldState, ...newState }), {
		selectedSearchType: selectList[0],
		searchText: '',
	});

	const { selectedSearchType, searchText } = state;

	const onSelectChanged = (item: string) => {
		setState({ selectedSearchType: item });
	};

	return (
		<div className='flex flex-row justify-between '>
			<SelectDropdown onChange={onSelectChanged} list={selectList} value={selectedSearchType} style={{ minWidth: 200 }} />
			<input className='border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent flex-1 mx-10 rounded-md px-3' placeholder='Search...' />
			<button className='bg-blue-300 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 text-white rounded-md px-5'>Search</button>
		</div>
	);
}
