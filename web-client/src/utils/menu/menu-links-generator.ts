import MenuLink from '../../model/menu-link';
import { UserRole } from '../../model/user-role.enum';
import { AdminMenuLinks } from './menu-links/admin-menu-links';
import { ClientMenuLinks } from './menu-links/client-menu-links';
import { InstructorMenuLinks } from './menu-links/instructor-menu-links';
import { LodgeOwnerMenuLinks } from './menu-links/lodge-owner-menu-links';
import { ShipOwnerMenuLinks } from './menu-links/ship-owner-menu-links';

export class MenuLinksGenerator {
  public generate(userRole: UserRole): MenuLink[] {
    switch (userRole) {
      case UserRole.ADMIN:
        return AdminMenuLinks;
      case UserRole.CLIENT:
        return ClientMenuLinks;
      case UserRole.INSTRUCTOR:
        return InstructorMenuLinks;
      case UserRole.LODGE_OWNER:
        return LodgeOwnerMenuLinks;
      case UserRole.SHIP_OWNER:
        return ShipOwnerMenuLinks;
      default:
        return [];
    }
  }
}
