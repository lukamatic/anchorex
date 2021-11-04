import React from 'react';
import { UserRole } from '../model/user-role.enum';

const AuthContext = React.createContext({
  userRole: UserRole.UNDEFINED,
  setUserRole: (userRole: UserRole) => {},
});

export default AuthContext;
