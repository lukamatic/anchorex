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
	id?: number;
}

export interface UserPasswordDto {
	id: number | undefined;
	password: string;
}

export interface UserConfirmPassword {
	password: string;
	repeatedPassword: string;
}
