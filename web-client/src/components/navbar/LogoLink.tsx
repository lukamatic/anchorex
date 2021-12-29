import { Link } from 'react-router-dom';

const LogoLink = () => {
  const anchorexLogoImage = require('./../../images/anchorex-logo.png');

  return (
    <Link to='/' className='flex flex-row items-center text-2xl mr-4'>
      <img
        src={anchorexLogoImage.default}
        alt='anchorex-logo.png'
        width={35}
        height={35}
        className='mr-4'
      />
      Anchorex
    </Link>
  );
};

export default LogoLink;
