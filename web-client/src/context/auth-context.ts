import React from 'react';
import CreateUserDto from '../dtos/create-user.dto';
import { UserRole } from '../model/user-role.enum';

const AuthContext = React.createContext({
	userRole: UserRole.UNDEFINED,
	setUserRole: (userRole: UserRole) => {},
	user: {} as CreateUserDto,
	setUser: (user: CreateUserDto) => {},
});

export default AuthContext;
