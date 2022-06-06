import { UserRole } from '../model/user-role.enum';

export default interface CreateUserDto {
	role: UserRole;
	email: string;
	password?: string;
	firstName: string;
	lastName: string;
	address?: string;
	city?: string;
	country?: string;
	phoneNumber?: string;
	biography?: string;
	signupExplanation?: string;
	id?: number;
	penaltyCount?: number;
}
export const emptyCreateUserDto: CreateUserDto = {
	role: UserRole.UNDEFINED,
	email: '',
	password: '',
	firstName: '',
	lastName: '',
	address: '',
	city: '',
	country: '',
	phoneNumber: '',
	biography: '',
	signupExplanation: '',
	id: -1,
	penaltyCount: 0,
};
