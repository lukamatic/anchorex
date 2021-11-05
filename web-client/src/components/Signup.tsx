import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <div className='bg-gray-100 flex flex-col items-center justify-center absolute top-0 bottom-0 left-0 right-0'>
      <Link
        to='/clientSignup'
        className='bg-white shadow-xl max-w-md flex flex-col -mt-10 mx-3 p-3'
      >
        <p className='text-xl text-blue-500'>Register as client</p>
        <p className='p-1 text-gray-500'>
          Explore our community's lodges, ships and fishing adventures. Rise up
          your adrenaline and spend time with our servicers. You won't regret
          it!
        </p>
      </Link>
      <Link
        to='/serviceSignup'
        className='bg-white shadow-xl max-w-md flex flex-col mt-10 mx-3 p-3'
      >
        <p className='text-xl text-blue-500'>Register as service</p>
        <p className='p-1 text-gray-500'>
          Join our community and provide services to our clients by renting
          lodges or ships or even teaching them how to catch some fish!
        </p>
      </Link>
    </div>
  );
};

export default Signup;
