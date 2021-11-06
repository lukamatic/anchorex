export default class EmailTakenError implements Error {
  name: string;
  message: string;
  stack?: string | undefined;

  constructor() {
    this.name = 'EmailTakenError';
    this.message = 'Account with entered email already exists.';
  }
}
