import { Link } from 'react-router-dom';

const SignupChoice = () => {
  return (
    <div className='bg-blue-50 flex flex-col flex-grow items-center pt-10 md:pt-20'>
      <Link
        to='/signup/client'
        className='bg-white shadow-xl max-w-md flex flex-col mx-5 p-3'
      >
        <p className='text-xl text-blue-500'>Sign up as client</p>
        <p className='p-1 text-gray-500'>
          Explore our community's lodges, ships and fishing adventures. Rise up
          your adrenaline and spend time with our servicers. You won't regret
          it!
        </p>
      </Link>
      <Link
        to='/signup/service'
        className='bg-white shadow-xl max-w-md flex flex-col mt-10 mx-5 p-3'
      >
        <p className='text-xl text-blue-500'>Sign up as service</p>
        <p className='p-1 text-gray-500'>
          Join our community and provide services to our clients by renting
          lodges or ships or even teaching them how to catch some fish!
        </p>
      </Link>
    </div>
  );
};

export default SignupChoice;
