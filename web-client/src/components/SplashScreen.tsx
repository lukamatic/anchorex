import LoadingSpinner from './common/LoadingSpinner';

const SplashScreen = () => {
	const anchorexLogoImage = require('../images/anchorex-logo.png');
	return (
		<div className=' w-full bg-blue-400 flex-1 flex flex-col items-center justify-center'>
			<div className='flex flex-row items-end mb-12 px-4 py-5'>
				<img src={anchorexLogoImage.default} alt='anchorex-logo.png' height={45} width={45} className='mr-4' />
				<h1 className='text-5xl '>Anchorex</h1>
			</div>
			<div>
				<LoadingSpinner color='text-black' />
			</div>
		</div>
	);
};

export default SplashScreen;
