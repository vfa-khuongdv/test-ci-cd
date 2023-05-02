/**
 * user.controller.ts
 * SPL_template
 * Created by khuongdv <khuongdv@vitalify.asia> on 3/17/23
 * Copyright (c) 2023 VFA Asia Co.,Ltd. All rights reserved.
 */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
  Request,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '@/modules/users/dto/create-user.dto';
import { CreateResponse, UpdateResponse } from '@/shared/types';
import { JwtAuthGuard } from '@/modules/auth/jwt-auth.guard';
import { AssignRoleDto } from '@/modules/users/dto/assign-role.dto';
import { User } from '@/entities/user.entity';
import { AuthUser } from '@/shared/decorators/auth-user.decorator';
import { ChangePasswordDto } from '@/modules/users/dto/change-password.dto';
import { Roles } from '@/shared/decorators/roles.decorator';
import { PermissionEnum, RoleEnum } from '@/shared/constants';
import { Permissions } from '@/shared/decorators/permissions.decorator';
import { PermissionsGuard } from '@/shared/guards/permissions.guard';
import { SwaggerJwt } from '@/shared/decorators/swagger-jwt';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @SwaggerJwt({
    apiTags: 'users',
    authorization: false,
  })
  @Post('')
  @HttpCode(201)
  public create(@Body() params: CreateUserDto): Promise<CreateResponse> {
    return this.usersService.create(params);
  }

  @SwaggerJwt({
    apiTags: 'users',
  })
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.usersService.profile(req.user.id);
  }

  @SwaggerJwt({
    apiTags: 'users',
  })
  @Post(':userId/roles')
  @Roles(RoleEnum.SuperAdmin)
  @Permissions(PermissionEnum.assignedRole)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @HttpCode(200)
  public updateRoles(
    @Param('userId') userId: number,
    @Body() params: AssignRoleDto,
  ): Promise<UpdateResponse> {
    return this.usersService.updateRoles(userId, params.roleIds);
  }

  @SwaggerJwt({
    apiTags: 'users',
  })
  @Post('change-password')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  public changePassword(
    @AuthUser() { id }: User,
    @Body() params: ChangePasswordDto,
  ): Promise<UpdateResponse> {
    return this.usersService.changePassword(id, params);
  }
}
