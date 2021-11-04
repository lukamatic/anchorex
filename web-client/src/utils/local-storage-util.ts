import { UserRole } from '../model/user-role.enum';

export default class LocalStorageUtil {
  public getUserRole(): UserRole {
    const userRoleStr = localStorage.getItem('user_role');
    return userRoleStr
      ? UserRole[userRoleStr as keyof typeof UserRole]
      : UserRole.UNDEFINED;
  }

  public setUserRole(userRole: UserRole): void {
    localStorage.setItem('user_role', userRole);
  }
}
