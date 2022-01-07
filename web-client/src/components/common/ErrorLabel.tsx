const ErrorLabel = (props: { text: string }) => {
  return (
    <div className='mt-1 mb-4'>
      <p className='text-red-600 text-center text-base h-5'>{props.text}</p>
    </div>
  );
};

export default ErrorLabel;
