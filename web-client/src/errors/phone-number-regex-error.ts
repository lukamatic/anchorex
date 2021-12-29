export default class PhoneNumberRegexError {
  name: string;
  message: string;
  stack?: string | undefined;

  constructor() {
    this.name = 'PhoneNumberRegexError';
    this.message = 'Phone number must be in format +123456';
  }
}
