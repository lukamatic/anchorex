import { UserRole } from '../model/user-role.enum';

export default interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  userRole: UserRole;
  password: string;
  dateOfBirth: string;
  profileDescription: string;
}
