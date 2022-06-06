import { List } from 'lodash';
import { useContext, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import AuthContext from '../context/auth-context';
import CreateUserDto from '../dtos/create-user.dto';
import { UserRole } from '../model/user-role.enum';
import { singUpAsync } from '../server/service';
import { HttpStatusCode } from '../utils/http-status-code.enum';
import SignupValidation from '../validations/signup-validation';
import ErrorLabel from './common/ErrorLabel';
import SignupInput from './signup/SignupInput';

const NewAdmin = () => {
	const authContext = useContext(AuthContext);
	const history = useHistory();

	const params: { choice: string } = useParams();
	const signupValidation = new SignupValidation();

	const [email, setEmail] = useState('');
	const [userRole, setUserRole] = useState(params.choice === 'client' ? UserRole.CLIENT : UserRole.LODGE_OWNER);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [address, setAddress] = useState('');
	const [city, setCity] = useState('');
	const [country, setCountry] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [signupExplanation, setSignupExplanation] = useState('');
	const [biography, setBiography] = useState('');

	const [firstNameErrorText, setFirstNameErrorText] = useState('');
	const [lastNameErrorText, setLastNameErrorText] = useState('');
	const [emailErrorText, setEmailErrorText] = useState('');
	const [passwordErrorText, setPasswordErrorText] = useState('');
	const [confirmPasswordErrorText, setConfirmPasswordErrorText] = useState('');
	const [addressErrorText, setAddressErrorText] = useState('');
	const [cityErrorText, setCityErrorText] = useState('');
	const [countryErrorText, setCountryErrorText] = useState('');
	const [phoneNumberErrorText, setPhoneNumberErrorText] = useState('');
	const [signupExplanationErrorText, setSignupExplanationErrorText] = useState('');
	const [errorLabelText, setErrorText] = useState('');

	const firstNameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setFirstName(value);
		setFirstNameErrorText('');

		if (!value) {
			return;
		}

		try {
			signupValidation.validateFirstName(value);
			setFirstNameErrorText('');
		} catch (error: any) {
			setFirstNameErrorText(error.message);
		}
	};

	const lastNameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setLastName(value);
		setLastNameErrorText('');

		if (!value) {
			return;
		}

		try {
			signupValidation.validateLastName(value);
		} catch (error: any) {
			setLastNameErrorText(error.message);
		}
	};

	const emailChangeHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setEmail(value);
		setEmailErrorText('');

		if (!value) {
			return;
		}

		try {
			signupValidation.validateEmail(value);
		} catch (error: any) {
			setEmailErrorText(error.message);
		}
	};

	const addressChangeHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setAddress(value);

		if (value) {
			setAddressErrorText('');
		}
	};

	const cityChangeHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setCity(value);

		if (value) {
			setCityErrorText('');
		}
	};

	const countryChangeHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setCountry(value);

		if (value) {
			setCountryErrorText('');
		}
	};

	const phoneNumberChangeHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log(event.target.value);
		const value = event.target.value;
		setPhoneNumber(value);
		setPhoneNumberErrorText('');

		if (!value) {
			return;
		}

		try {
			signupValidation.validatePhoneNumber(value);
		} catch (error: any) {
			setPhoneNumberErrorText(error.message);
		}
	};

	const userRoleChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
		switch (event.target.value) {
			case 'LODGE_OWNER':
				return setUserRole(UserRole.LODGE_OWNER);
			case 'SHIP_OWNER':
				return setUserRole(UserRole.SHIP_OWNER);
			case 'INSTRUCTOR':
				return setUserRole(UserRole.INSTRUCTOR);
		}
	};

	const signupExplanationChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setSignupExplanation(event.target.value);
	};

	const passwordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setPassword(value);
		setPasswordErrorText('');

		if (!value) {
			return;
		}

		try {
			signupValidation.validatePassword(value);
		} catch (error: any) {
			setPasswordErrorText(error.message);
		}
	};

	const confirmPasswordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setConfirmPassword(value);

		if (!value) {
			return;
		}

		try {
			signupValidation.validateConfirmPassword(value, password);
			setConfirmPasswordErrorText('');
		} catch (error: any) {
			setConfirmPasswordErrorText(error.message);
		}
	};

	const biographyChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setBiography(event.target.value);
	};

	const fieldsToValidate: List<[string, any]> = [
		[firstName, setFirstNameErrorText],
		[lastName, setLastNameErrorText],
		[email, setEmailErrorText],
		[address, setAddressErrorText],
		[city, setCityErrorText],
		[country, setCountryErrorText],
		[phoneNumber, setPhoneNumberErrorText],
		[password, setPasswordErrorText],
		[confirmPassword, setConfirmPasswordErrorText],
	];
	const isInputValid = () => {
		if (firstNameErrorText || lastNameErrorText || emailErrorText || phoneNumberErrorText || passwordErrorText || confirmPasswordErrorText) {
			return false;
		}
		let error = false;
		for (const validationFieldGroup in fieldsToValidate) {
			const field = validationFieldGroup[0];
			const setError: any = validationFieldGroup[1];
			if (!field) {
				setError('This field is required.');
				error = true;
			}
		}
		if (error) return false;
		return true;
	};

	const createAccount = async () => {
		if (isInputValid()) {
			setErrorText('');
			const createUserDto: CreateUserDto = {
				role: userRole,
				email: email,
				password: password,
				firstName: firstName,
				lastName: lastName,
				address: address,
				city: city,
				country: country,
				phoneNumber: phoneNumber,
				biography: biography,
				signupExplanation: signupExplanation,
			};
			const resp = await singUpAsync(createUserDto);
			if (resp.status === HttpStatusCode.CREATED) {
				alert('Email is sent. Please check your inbox!');
			}
		} else {
			setErrorText('Please fill out required fields correctly.');
		}
	};

	return (
		<div className='flex flex-col flex-grow bg-blue-50 items-center p-5'>
			<div className='flex flex-row justify-center flex-wrap shadow-lg lg:mt-16 bg-white'>
				<div className='flex flex-col items-center'>
					<div className='flex flex-col flex-grow text-lg px-8 pt-5 md:w-500px'>
						<SignupInput type='text' text='First name:' name='firstName' placeholder='first name' onChange={firstNameChangeHandler} />
						<ErrorLabel text={firstNameErrorText} />

						<SignupInput type='text' text='Last name:' name='lastName' placeholder='last name' onChange={lastNameChangeHandler} />
						<ErrorLabel text={lastNameErrorText} />

						<SignupInput type='email' text='Email:' name='email' placeholder='email' onChange={emailChangeHandler} />
						<ErrorLabel text={emailErrorText} />

						<SignupInput type='text' text='Address:' name='address' placeholder='address' onChange={addressChangeHandler} />
						<ErrorLabel text={addressErrorText} />

						<SignupInput type='text' text='City:' name='city' placeholder='city' onChange={cityChangeHandler} />
						<ErrorLabel text={cityErrorText} />

						<SignupInput type='text' text='Country:' name='country' placeholder='country' onChange={countryChangeHandler} />
						<ErrorLabel text={countryErrorText} />

						<SignupInput type='tel' text='Phone number:' name='phoneNumber' placeholder='phone number' onChange={phoneNumberChangeHandler} />
						<ErrorLabel text={phoneNumberErrorText} />

						{params.choice === 'service' && (
							<div className='flex flex-wrap items-center mb-8'>
								<p className='mt-1 w-44 whitespace-nowrap'>I want to join as:</p>
								<select className='input bg-white' onChange={userRoleChangeHandler}>
									<option value='LOGDE_OWNER'>lodge owner</option>
									<option value='SHIP_OWNER'>ship owner</option>
									<option value='INSTRUCTOR'>fishing instructor</option>
								</select>
							</div>
						)}
					</div>
				</div>
				<div className='flex flex-col items-center'>
					<div className='flex flex-col flex-grow text-lg px-8 pt-5 md:w-500px'>
						{params.choice === 'service' && (
							<div>
								<div className='flex flex-wrap items-center mb-3'>
									<p className='my-1'>Signup explanation:</p>
									<textarea className='input resize-none w-full h-40' maxLength={150} placeholder='Say something about why you are joining Anchorex' onChange={signupExplanationChangeHandler} />
								</div>

								<ErrorLabel text={confirmPasswordErrorText} />
							</div>
						)}

						<SignupInput type='password' text='Password:' name='password' placeholder='password' onChange={passwordChangeHandler} />
						<ErrorLabel text={passwordErrorText} />

						<SignupInput type='password' text='Confirm password' name='confirmPassword' placeholder='confirm password' onChange={confirmPasswordChangeHandler} />
						<ErrorLabel text={confirmPasswordErrorText} />

						<div className='flex flex-wrap items-center mb-3'>
							<p className='my-1'>About me:</p>
							<p className='ml-2 text-gray-500'>(optional)</p>
							<textarea className='input resize-none w-full h-40' maxLength={150} placeholder='Say something about yourself' onChange={biographyChangeHandler} />
						</div>
					</div>
				</div>
			</div>

			<div className='flex flex-col justify-center my-5'>
				<ErrorLabel text={errorLabelText} />
				<button className='btnBlueWhite w-72' onClick={createAccount}>
					Create account
				</button>
			</div>
		</div>
	);
};

export default NewAdmin;
