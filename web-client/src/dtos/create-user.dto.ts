import { UserRole } from '../model/user-role.enum';

export default interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  password: string;
  // dateOfBirth: string;
  biography: string;
  country: string;
  phoneNumber: string;
  city: string;
  address: string;
}
