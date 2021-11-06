const SignupInput = (props: {
  type: string;
  text: string;
  name: string;
  placeholder: string;
  onChange: React.ChangeEventHandler;
}) => {
  return (
    <div className='flex flex-wrap items-center'>
      <p className='my-1 w-44 whitespace-nowrap'>{props.text}</p>
      <input
        className='input flex-grow md:w-60'
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
    </div>
  );
};

export default SignupInput;
