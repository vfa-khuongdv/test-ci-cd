import { Module } from '@nestjs/common';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';
import { PermissionRepository } from '@/repositories/permission/permission.repository';
import { UserRepository } from '@/repositories/user/user.repository';

@Module({
  imports: [],
  controllers: [PermissionsController],
  providers: [PermissionsService, PermissionRepository, UserRepository],
})
export class PermissionsModule {}
