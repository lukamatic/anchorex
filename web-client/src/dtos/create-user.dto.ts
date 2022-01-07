import { UserRole } from '../model/user-role.enum';

export default interface CreateUserDto {
  role: UserRole;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  country: string;
  phoneNumber: string;
  biography: string;
  signupExplanation: string;
}
