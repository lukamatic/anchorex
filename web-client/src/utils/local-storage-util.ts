import { UserRole } from '../model/user-role.enum';
import { LocalStorageItem } from './local-storage-item.enum';

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

  public setAccessToken(value: string): void {
    localStorage.setItem(LocalStorageItem.ACCESS_TOKEN, value);
  }
}
