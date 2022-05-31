import { useContext, useState } from 'react';
import AuthContext from '../../context/auth-context';
import SignupInput from '../signup/SignupInput';
import ErrorLabel from '../common/ErrorLabel';
import CreateUserDto from '../../dtos/create-user.dto';
import TextInput from '../common/TextInput';
import SignupValidation from '../../validations/signup-validation';
import LeftArrow from '../../icons/LeftArrow';
import { useHistory } from 'react-router-dom';
const ProfileScreen = () => {
	const history = useHistory();
	const { user } = useContext(AuthContext);

	const [userData, setUserData] = useState<CreateUserDto>(user);
	const [errorMessage, setErrorMessage] = useState<any>({});
	const signUpValidation = new SignupValidation();

	const handleChange = (e: any, field: string, validation: any) => {
		const value = e.target.value;
		let newUserData: any = { ...userData };
		newUserData[field] = value;
		setUserData(newUserData);
		let newErrorMessages: any = { ...errorMessage };
		newErrorMessages[field] = '';
		if (!value) return;
		try {
			if (validation) validation(value);
		} catch (error: any) {
			newErrorMessages[field] = error.message;
		}
		setErrorMessage(newErrorMessages);
		console.log(newErrorMessages);
		console.log(newUserData);
	};

	const save = () => {};
	const changePassword = () => {
		history.push('/changePassword');
	};
	const goBack = () => {
		history.goBack();
	};

	return (
		<div className='flex '>
			<div className='mt-20  max-w-6xl p-12 bg-blue-200 mx-auto rounded-xl shadow-md relative'>
				<div className='mb-5 flex flex-row'>
					<button className='flex flex-row items-center px-3 pt-1 w-28' onClick={goBack}>
						<LeftArrow className='' />
						<span className='ml-1'>Back</span>
					</button>
					<h1 className='text-4xl mr-2'>User profile</h1>
				</div>
				<div className='flex flex-row '>
					<div className='flex flex-col flex-grow text-lg px-8 pt-5 '>
						<TextInput
							type='text'
							value={userData.firstName}
							text='First name:'
							name='firstName'
							placeholder='first name'
							onChange={(e: any) => {
								console.log(e);
								handleChange(e, 'first_name', signUpValidation.validateFirstName);
							}}
						/>
						<ErrorLabel text={errorMessage?.firstName} />

						<TextInput type='text' value={userData.lastName} text='Last name:' name='lastName' placeholder='last name' onChange={(e: any) => handleChange(e, 'lastName', signUpValidation.validateLastName)} />
						<ErrorLabel text={errorMessage?.lastName} />

						<TextInput type='email' value={userData.email} text='Email:' name='email' placeholder='email' onChange={(e: any) => handleChange(e, 'email', signUpValidation.validateEmail)} disabled={true} />
						<ErrorLabel text={errorMessage?.email} />

						<TextInput type='text' value={userData.address} text='Address:' name='address' placeholder='address' onChange={(e: any) => handleChange(e, 'address', null)} />
						<ErrorLabel text={errorMessage?.address} />

						<TextInput type='text' text='City:' value={userData.city} name='city' placeholder='city' onChange={(e: any) => handleChange(e, 'city', null)} />
						<ErrorLabel text={errorMessage?.city} />

						<TextInput type='text' text='Country:' value={userData.country} name='country' placeholder='country' onChange={(e: any) => handleChange(e, 'country', null)} />
						<ErrorLabel text={errorMessage?.country} />

						<TextInput type='tel' text='Phone number:' value={userData.phoneNumber} name='phoneNumber' placeholder='phone number' onChange={(e: any) => handleChange(e, 'phoneNumber', signUpValidation.validatePhoneNumber)} />
						<ErrorLabel text={errorMessage?.phone} />
					</div>
					<div className='flex flex-col items-center'>
						<div className='flex flex-col flex-grow text-lg px-8 pt-5'>
							<div className='flex flex-wrap  mb-3 '>
								<p className='my-1'>About me:</p>
								<p className='ml-2 text-gray-500'>(optional)</p>
								<textarea className='input resize-none w-full h-40' maxLength={150} placeholder='Say something about yourself' onChange={(e: any) => handleChange(e, 'biography', null)} />
							</div>
							<div className='flex-1'></div>
							<button className='btnWhiteBlue w-full mb-3' onClick={changePassword}>
								Change password
							</button>
							<button className='btnBlueWhite w-full' onClick={save}>
								Save
							</button>
						</div>
					</div>
				</div>
				<div className='absolute p-8 bg-white -right-56 shadow-md rounded-md w-72 border-4 border-blue-200 flex flex-col top-8'>
					<div>
						<p className='text-3xl text-gray-500'>Loyalty program</p>
						<p className='text-xl text-gray-500 text-bold'>GOLD</p>
					</div>
					<div>
						<p className='text-2xl text-gray-500'>Points</p>
						<p className='text-xl text-gray-500 text-bold'>30</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileScreen;
