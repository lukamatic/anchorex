import FirstNameRegexError from '../errors/first-name-regex-error';
import LastNameRegexError from '../errors/last-name-regex-error';
import PasswordShortError from '../errors/password-short-error';
import PasswordsDontMatchError from '../errors/passwords-dont-match-error';
import PhoneNumberRegexError from '../errors/phone-number-regex-error';
import UserImmatureError from '../errors/user-immature-error';
import EmailRegexError from '../errors/email-regex-error';
import EmailTakenError from '../errors/email-taken-error';

const MIN_USER_AGE = 12;
const MIN_PASSWORD_LENGTH = 8;

export default class SignupValidation {
  private noSpecialCharsOrNumbersRegex: RegExp = new RegExp(
    // eslint-disable-next-line
    /^[^`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~0123456789]+$/
  );
  private emailRegex: RegExp = new RegExp(
    // eslint-disable-next-line
    /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/
  );
  private phoneNumberRegex: RegExp = new RegExp(/^[+][0-9 ]+$/);

  public validateFirstName = (value: string) => {
    if (!this.isFirstNameRegexValid(value)) {
      throw new FirstNameRegexError();
    }
  };

  private isFirstNameRegexValid = (value: string) => {
    return this.noSpecialCharsOrNumbersRegex.test(value);
  };

  public validateLastName = (value: string) => {
    if (!this.isLastNameRegexValid(value)) {
      throw new LastNameRegexError();
    }
  };

  private isLastNameRegexValid = (value: string) => {
    return this.noSpecialCharsOrNumbersRegex.test(value);
  };

  public validateEmail = (value: string) => {
    if (!this.isEmailRegexValid(value)) {
      throw new EmailRegexError();
    }

    if (this.isEmailTaken(value)) {
      throw new EmailTakenError();
    }
  };

  private isEmailRegexValid = (value: string) => {
    return this.emailRegex.test(value);
  };

  private isEmailTaken = (username: string): boolean => {
    // TODO: send request for checking if email is taken
    return false;
  };

  public validateDateOfBirth = (value: string) => {
    if (!this.isAtLeastTwelve(value)) {
      throw new UserImmatureError();
    }
  };

  private isAtLeastTwelve = (value: string) => {
    const currentYear = new Date().getFullYear();
    const yearOfBirth = new Date(Date.parse(value)).getFullYear();
    return currentYear - yearOfBirth >= MIN_USER_AGE;
  };

  public validatePassword = (value: string) => {
    if (!this.isPasswordLengthValid(value)) {
      throw new PasswordShortError();
    }
  };

  private isPasswordLengthValid = (value: string) => {
    return value.length >= MIN_PASSWORD_LENGTH;
  };

  public validateConfirmPassword = (value: string, password: string) => {
    if (!this.doPasswordsMatch(value, password)) {
      throw new PasswordsDontMatchError();
    }
  };

  private doPasswordsMatch = (value: string, password: string) => {
    return value === password;
  };

  public validatePhoneNumber = (value: string) => {
    if (!this.isPhoneNumberValid(value)) {
      throw new PhoneNumberRegexError();
    }
  };

  private isPhoneNumberValid = (value: string) => {
    return this.phoneNumberRegex.test(value);
  };
}
