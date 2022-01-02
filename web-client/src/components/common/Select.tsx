/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

const classNames = (...classes: any) => {
	return classes.filter(Boolean).join(' ');
};

const Select = (props: any) => {
	const { list, value, onChange, style } = props;
	return (
		<Listbox value={value} onChange={onChange}>
			{({ open }) => (
				<>
					<div className='relative' style={{ ...style }}>
						<Listbox.Button className='relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-blue-200 sm:text-sm'>
							<span className='flex items-center'>
								<span className='ml-3 block truncate'>{value}</span>
							</span>
							<span className='ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
								<SelectorIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
							</span>
						</Listbox.Button>

						<Transition show={open} as={Fragment} leave='transition ease-in duration-100' leaveFrom='opacity-100' leaveTo='opacity-0'>
							<Listbox.Options className='absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>
								{list.map((item: any, index: number) => (
									<Listbox.Option key={index} className={({ active }) => classNames(active ? 'text-white bg-blue-300' : 'text-gray-900', 'cursor-default select-none relative py-2 pl-3 pr-9')} value={item}>
										{({ selected, active }) => (
											<>
												<div className='flex items-center'>
													{/* <img src={item} alt='' className='flex-shrink-0 h-6 w-6 rounded-full' /> */}
													<span className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>{item}</span>
												</div>

												{selected ? (
													<span className={classNames(active ? 'text-white' : 'text-blue-300', 'absolute inset-y-0 right-0 flex items-center pr-4')}>
														<CheckIcon className='h-5 w-5' aria-hidden='true' />
													</span>
												) : null}
											</>
										)}
									</Listbox.Option>
								))}
							</Listbox.Options>
						</Transition>
					</div>
				</>
			)}
		</Listbox>
	);
};
export default Select;
