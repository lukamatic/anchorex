import { UserRole } from '../model/user-role.enum';

export default interface User {
	roles: UserRole;
	email: string;
	firstName: string;
	lastName: string;
	address?: string;
	city?: string;
	country?: string;
	phoneNumber?: string;
	biography?: string;
}
