import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRepository } from '@/repositories/user/user.repository';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const allowedRole =
      this.reflector.get<string[]>('roles', context.getHandler()) ?? [];
    const allowedPermission =
      this.reflector.get<string[]>('permissions', context.getHandler()) ?? [];

    const request = context.switchToHttp().getRequest();
    const user = await this.userRepository.findRoleAndPermission(
      request.user.id,
    );
    const userRoles = user.roles.map((e) => e.name);
    const userPermissions = user.roles.reduce((acc, cur) => {
      const items = cur.permissions.map((e) => e.key);
      acc = [...acc, ...items];
      return acc;
    }, []);
    console.log('roles', userRoles, allowedRole);
    console.log('per', userPermissions, allowedPermission);

    const isAllowedRole = this.validateRole(userRoles, allowedRole);
    const isAllowedPermission = this.validatePermissions(
      userPermissions,
      allowedPermission,
    );

    console.log('isAllowedRole', isAllowedRole);
    console.log('isAllowedPermission', isAllowedPermission);

    return !!(isAllowedRole || isAllowedPermission);
  }

  /**
   * Validate access router by permissions
   *
   * @private
   * @param permissions
   * @param allowedPermissions
   */
  private validatePermissions(
    permissions: string[],
    allowedPermissions: string[],
  ): boolean {
    return allowedPermissions.some((role) => permissions.includes(role));
  }

  /**
   * Validate access router by roles
   *
   * @param roles
   * @param allowedRoles
   * @private
   */
  private validateRole(roles: string[], allowedRoles: string[]): boolean {
    console.log('allowedRoles', allowedRoles);
    return allowedRoles.some((role) => roles.includes(role));
  }
}
