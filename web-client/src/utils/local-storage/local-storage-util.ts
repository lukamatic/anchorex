import { AuthContextUser, unsignedUser } from '../../context/auth-context';
import { UserRole } from '../../model/user-role.enum';
import { LocalStorageItem } from './local-storage-item.enum';

class LocalStorageUtil {
  public getUser(): AuthContextUser {
    const accessToken = this.getAccessToken();

    if (accessToken) {
      return {
        accessToken: accessToken,
        loggedIn: true,
        id: this.getUserId(),
        email: this.getEmail(),
        role: this.getUserRole(),
      };
    }

    return unsignedUser;
  }

  public setUser(user: AuthContextUser): void {
    console.log(user);
    this.setAccessToken(user.accessToken);
    this.setUserId(user.id);
    this.setEmail(user.email);
    this.setUserRole(user.role);
  }

  public getAccessToken(): string | null {
    return localStorage.getItem(LocalStorageItem.ACCESS_TOKEN);
  }

  public setAccessToken(value: string): void {
    localStorage.setItem(LocalStorageItem.ACCESS_TOKEN, value);
  }

  public getUserId(): number {
    const userIdStr = localStorage.getItem(LocalStorageItem.USER_ID);
    return userIdStr ? parseInt(userIdStr) : -1;
  }

  public setUserId(userId: number): void {
    localStorage.setItem(LocalStorageItem.USER_ID, userId.toString());
  }

  public getEmail(): string {
    return localStorage.getItem(LocalStorageItem.EMAIL) || '';
  }

  public setEmail(value: string): void {
    localStorage.setItem(LocalStorageItem.EMAIL, value);
  }

  public getUserRole(): UserRole {
    const userRoleStr = localStorage.getItem(LocalStorageItem.USER_ROLE);
    return userRoleStr
      ? UserRole[
          userRoleStr.substring(5, userRoleStr.length) as keyof typeof UserRole
        ]
      : UserRole.UNDEFINED;
  }

  public setUserRole(userRole: UserRole): void {
    localStorage.setItem(LocalStorageItem.USER_ROLE, userRole);
  }
}

const localStorageUtil = new LocalStorageUtil();
export default localStorageUtil;
