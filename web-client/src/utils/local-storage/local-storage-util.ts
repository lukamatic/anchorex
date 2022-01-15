import { UserRole } from '../../model/user-role.enum';
import { LocalStorageItem } from './local-storage-item.enum';

class LocalStorageUtil {
	public getUserRole(): UserRole {
		const userRoleStr = localStorage.getItem('user_role');
		return userRoleStr ? UserRole[userRoleStr.substring(5, userRoleStr.length) as keyof typeof UserRole] : UserRole.UNDEFINED;
	}

	public setUserRole(userRole: UserRole): void {
		localStorage.setItem('user_role', userRole);
	}

	public setAccessToken(value: string): void {
		localStorage.setItem(LocalStorageItem.ACCESS_TOKEN, value);
	}
	public getAccessToken(): string | null {
		return localStorage.getItem(LocalStorageItem.ACCESS_TOKEN);
	}

	public setEmail(value: string): void {
		localStorage.setItem(LocalStorageItem.email, value);
	}
	public getEmail(): string | null {
		return localStorage.getItem(LocalStorageItem.email);
	}
	public clear(): void {
		localStorage.clear();
	}
}

const localStorageUtil = new LocalStorageUtil();
export default localStorageUtil;
