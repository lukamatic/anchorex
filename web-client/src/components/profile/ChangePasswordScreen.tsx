import { useContext, useState } from 'react';
import AuthContext from '../../context/auth-context';
import SignupInput from '../signup/SignupInput';
import ErrorLabel from '../common/ErrorLabel';
import CreateUserDto from '../../dtos/create-user.dto';
import TextInput from '../common/TextInput';
import SignupValidation from '../../validations/signup-validation';
import LeftArrow from '../../icons/LeftArrow';
import { useHistory } from 'react-router-dom';
import { changePasswordAsync, patchUser } from '../../server/service';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import { UserConfirmPassword, UserPasswordDto } from '../../dtos/user';
import LoadingSpinner from '../common/LoadingSpinner';

const ChangePasswordScreen = () => {
	const history = useHistory();
	const { user, userDetails } = useContext(AuthContext);

	const [userData, setUserData] = useState<UserConfirmPassword>({
		password: '',
		repeatedPassword: '',
	});
	const [errorMessage, setErrorMessage] = useState<any>({});
	const [errorText, setErrorText] = useState<string>('');
	const [successText, setSuccessText] = useState<string>('');
	const [fetching, setFetching] = useState(false);
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
		setUserData(newUserData);
	};

	const save = async () => {
		if (!userData.password || !userData.repeatedPassword) {
			setErrorText('Password cannot be empty');
			return;
		} else if (userData.repeatedPassword != userData.password) {
			setErrorText("Passwords don't match");
			return;
		}
		setErrorText('');
		setFetching(true);

		const data: UserPasswordDto = {
			id: user.id,
			password: userData.password,
		};
		const resp = await changePasswordAsync(data);
		if (resp.status === HttpStatusCode.OK) {
			setSuccessText('Password has been changed!');
		} else {
			setErrorText('Internal server error');
		}
		setFetching(false);
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
					<h1 className='text-4xl mr-2'>Change password</h1>
				</div>
				<div className='flex flex-row '>
					<div className='flex flex-col flex-grow text-lg px-8 pt-5 items-center'>
						<TextInput type='password' value={userData.password} text='Password:' name='Password' placeholder='Password' onChange={(e: any) => handleChange(e, 'password', signUpValidation.validateLastName)} />
						<ErrorLabel text={errorMessage?.lastName} />
						<TextInput type='password' value={userData.repeatedPassword} text='Repeat password:' name='repeatedPassword' placeholder='repeat password' onChange={(e: any) => handleChange(e, 'repeatedPassword', signUpValidation.validateLastName)} />
						<ErrorLabel text={errorMessage?.lastName} />

						{fetching ? (
							<div className='mt-4'>
								<LoadingSpinner />
							</div>
						) : (
							<div className='flex flex-col w-full px-16 md:px-0 text-lg'>
								<p className='text-red-600 text-center text' hidden={!errorText}>
									{errorText}
								</p>
								<p className='text-green-600 text-center text' hidden={!successText}>
									{successText}
								</p>
								<button className='btnBlueWhite my-2' onClick={save}>
									Change password
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChangePasswordScreen;
