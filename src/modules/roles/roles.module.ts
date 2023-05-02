import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { RoleRepository } from '@/repositories/role/role.repository';
import { PermissionRepository } from '@/repositories/permission/permission.repository';
import { UserRepository } from '@/repositories/user/user.repository';

@Module({
  controllers: [RolesController],
  providers: [
    RolesService,
    RoleRepository,
    PermissionRepository,
    UserRepository,
  ],
})
export class RolesModule {}
