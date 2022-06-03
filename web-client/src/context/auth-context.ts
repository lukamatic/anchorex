import React from 'react';
import CreateUserDto, { emptyCreateUserDto } from '../dtos/create-user.dto';
import { UserRole } from '../model/user-role.enum';

export interface AuthContextUser {
	accessToken: string;
	loggedIn: boolean;
	id: number;
	email: string;
	role: UserRole;
}

export const unsignedUser: AuthContextUser = {
	accessToken: '',
	loggedIn: false,
	id: -1,
	email: '',
	role: UserRole.UNDEFINED,
};

const AuthContext = React.createContext({
	user: unsignedUser,
	updateAuthContext: (user: AuthContextUser) => {},
	userDetails: emptyCreateUserDto,
	setUserDetails: (user: CreateUserDto) => {},
});

export default AuthContext;
