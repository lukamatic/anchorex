const TextInput = (props: { type: string; text: string; name: string; placeholder: string; value?: string; onChange: any; disabled?: boolean }) => {
	const { disabled = false } = props;
	return (
		<div className='flex flex-wrap items-center'>
			<p className='my-1 w-44 whitespace-nowrap'>{props.text}</p>
			<input className='input flex-grow md:w-60' type={props.type} value={props.value} name={props.name} placeholder={props.placeholder} onChange={props.onChange} disabled={disabled} />
		</div>
	);
};

export default TextInput;
