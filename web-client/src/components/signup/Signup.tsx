import React, { useContext, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import AuthContext from '../../context/auth-context';
import CreateUserDto from '../../dtos/create-user.dto';
import { UserRole } from '../../model/user-role.enum';
import SignupValidation from '../../validations/signup-validation';
import SignupError from './SignupErrorLabel';
import SignupInput from './SignupInput';

const Signup = () => {
  const authContext = useContext(AuthContext);
  const history = useHistory();

  if (authContext.userRole !== UserRole.UNDEFINED) {
    history.push('/');
  }

  const params: { choice: string } = useParams();
  const signupValidation = new SignupValidation();

  const [email, setEmail] = useState('');
  const [userRole, setUserRole] = useState(
    params.choice === 'client' ? UserRole.CLIENT : UserRole.LODGE_OWNER
  );
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profileDescription, setProfileDescription] = useState('');

  const [firstNameErrorText, setFirstNameErrorText] = useState('');
  const [lastNameErrorText, setLastNameErrorText] = useState('');
  const [emailErrorText, setEmailErrorText] = useState('');
  const [dateOfBirthErrorText, setDateOfBirthErrorText] = useState('');
  const [passwordErrorText, setPasswordErrorText] = useState('');
  const [confirmPasswordErrorText, setConfirmPasswordErrorText] = useState('');
  const [addressErrorText, setAddressErrorText] = useState('');
  const [cityErrorText, setCityErrorText] = useState('');
  const [countryErrorText, setCountryErrorText] = useState('');
  const [phoneNumberErrorText, setPhoneNumberErrorText] = useState('');
  const [errorLabelText, setErrorText] = useState('');

  const firstNameChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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

  const lastNameChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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

  const emailChangeHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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

  const addressChangeHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setAddress(value);
  };

  const cityChangeHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setCity(value);
  };

  const countryChangeHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setCountry(value);
  };

  const phoneNumberChangeHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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

  const userRoleChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    switch (event.target.value) {
      case 'LODGE_OWNER':
        return setUserRole(UserRole.LODGE_OWNER);
      case 'SHIP_OWNER':
        return setUserRole(UserRole.SHIP_OWNER);
      case 'INSTRUCTOR':
        return setUserRole(UserRole.INSTRUCTOR);
    }
  };

  const dateOfBirthChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setDateOfBirth(value);
    setDateOfBirthErrorText('');

    if (!value) {
      return;
    }

    try {
      signupValidation.validateDateOfBirth(value);
    } catch (error: any) {
      setDateOfBirthErrorText(error.message);
    }
  };

  const passwordChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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

  const confirmPasswordChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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

  const profileDescriptionChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setProfileDescription(event.target.value);
  };

  const isInputValid = () => {
    if (
      firstNameErrorText ||
      lastNameErrorText ||
      emailErrorText ||
      phoneNumberErrorText ||
      dateOfBirthErrorText ||
      passwordErrorText ||
      confirmPasswordErrorText
    ) {
      return false;
    }

    if (!firstName) {
      setFirstNameErrorText('This field is required.');
    }

    if (!lastName) {
      setLastNameErrorText('This field is required.');
    }

    if (!email) {
      setEmailErrorText('This field is required.');
    }

    if (!address) {
      setAddressErrorText('This field is required.');
    }

    if (!city) {
      setCityErrorText('This field is required.');
    }

    if (!country) {
      setCountryErrorText('This field is required.');
    }

    if (!phoneNumber) {
      setPhoneNumberErrorText('This field is required.');
    }

    if (!dateOfBirth) {
      setDateOfBirthErrorText('This field is required.');
    }

    if (!password) {
      setPasswordErrorText('This field is required.');
    }

    if (!confirmPassword) {
      setConfirmPasswordErrorText('This field is required.');
    }

    if (
      !firstName ||
      !lastName ||
      !email ||
      !address ||
      !city ||
      !country ||
      !phoneNumber ||
      !dateOfBirth ||
      !password ||
      !confirmPassword
    ) {
      return false;
    }

    return true;
  };

  const createAccount = async () => {
    if (isInputValid()) {
      setErrorText('');
      const createUserDto: CreateUserDto = {
        userRole: userRole,
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: dateOfBirth,
        profileDescription: profileDescription,
      };
      console.log(createUserDto);
    } else {
      setErrorText('Please fill out required fields correctly.');
    }
  };

  return (
    <div className='flex flex-col flex-grow bg-gray-100 items-center p-5'>
      <div className='flex flex-row justify-center flex-wrap shadow-lg lg:mt-16 bg-white'>
        <div className='flex flex-col items-center'>
          <div className='flex flex-col flex-grow text-lg px-8 pt-5 md:w-500px'>
            <SignupInput
              type='text'
              text='First name:'
              name='firstName'
              placeholder='first name'
              onChange={firstNameChangeHandler}
            />
            <SignupError text={firstNameErrorText} />

            <SignupInput
              type='text'
              text='Last name:'
              name='lastName'
              placeholder='last name'
              onChange={lastNameChangeHandler}
            />
            <SignupError text={lastNameErrorText} />

            <SignupInput
              type='email'
              text='Email:'
              name='email'
              placeholder='email'
              onChange={emailChangeHandler}
            />
            <SignupError text={emailErrorText} />

            <SignupInput
              type='text'
              text='Address:'
              name='address'
              placeholder='address'
              onChange={addressChangeHandler}
            />
            <SignupError text={addressErrorText} />

            <SignupInput
              type='text'
              text='City:'
              name='city'
              placeholder='city'
              onChange={cityChangeHandler}
            />
            <SignupError text={cityErrorText} />

            <SignupInput
              type='text'
              text='Country:'
              name='country'
              placeholder='country'
              onChange={countryChangeHandler}
            />
            <SignupError text={countryErrorText} />

            <SignupInput
              type='tel'
              text='Phone number:'
              name='phoneNumber'
              placeholder='phone number'
              onChange={phoneNumberChangeHandler}
            />
            <SignupError text={phoneNumberErrorText} />
          </div>
        </div>
        <div className='flex flex-col items-center'>
          <div className='flex flex-col flex-grow text-lg px-8 py-6 md:w-500px'>
            {params.choice === 'service' && (
              <div className='flex flex-wrap items-center mb-8'>
                <p className='mt-1 w-44 whitespace-nowrap'>
                  I want to join as:
                </p>
                <select
                  className='input bg-white'
                  onChange={userRoleChangeHandler}
                >
                  <option value='LOGDE_OWNER'>lodge owner</option>
                  <option value='SHIP_OWNER'>ship owner</option>
                  <option value='INSTRUCTOR'>fishing instructor</option>
                </select>
              </div>
            )}

            <div className='flex flex-wrap items-center'>
              <p className='my-1 w-44 whitespace-nowrap'>Date of birth:</p>
              <input
                className='input bg-white'
                type='date'
                onChange={dateOfBirthChangeHandler}
                defaultValue='1990-01-01'
                max='2010-12-31'
              />
            </div>
            <SignupError text={dateOfBirthErrorText} />

            <SignupInput
              type='password'
              text='Password:'
              name='password'
              placeholder='password'
              onChange={passwordChangeHandler}
            />
            <SignupError text={passwordErrorText} />

            <SignupInput
              type='password'
              text='Confirm password'
              name='confirmPassword'
              placeholder='confirm password'
              onChange={confirmPasswordChangeHandler}
            />
            <SignupError text={confirmPasswordErrorText} />

            <div className='flex flex-wrap items-center mb-3'>
              <p className='my-1'>About me:</p>
              <p className='ml-2 text-gray-500'>(optional)</p>
              <textarea
                className='input resize-none w-full h-40'
                maxLength={150}
                placeholder='Say something about yourself'
                onChange={profileDescriptionChangeHandler}
              />
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col justify-center my-5'>
        <SignupError text={errorLabelText} />
        <button className='btnBlueWhite w-72' onClick={createAccount}>
          Create account
        </button>
      </div>
    </div>
  );
};

export default Signup;
