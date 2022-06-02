import { UserRole } from './user-role.enum';

export default interface User {
  id: number;
  role: UserRole;
  email: string;
}
