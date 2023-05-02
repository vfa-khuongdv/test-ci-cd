/**
 * user.module.ts
 * SPL_template
 * Created by khuongdv <khuongdv@vitalify.asia> on 3/17/23
 * Copyright (c) 2023 VFA Asia Co.,Ltd. All rights reserved.
 */
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserRepository } from '@/repositories/user/user.repository';
import { UsersService } from './users.service';
import { RoleRepository } from '@/repositories/role/role.repository';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, RoleRepository],
  exports: [UsersService],
})
export class UsersModule {}
