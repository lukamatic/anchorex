import { UserRole } from '../model/user-role.enum';

export default interface CreateUserDto {
  email: string;
  userRole: UserRole;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  country: string;
  phoneNumber: string;
  signupExplanation: string;
  biography: string;
}
