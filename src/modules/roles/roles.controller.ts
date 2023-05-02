import {
  Body,
  Patch,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RolesService } from '@/modules/roles/roles.service';
import { CreateRoleDto } from '@/modules/roles/dto/create-role.dto';
import { UpdateRoleDto } from '@/modules/roles/dto/update-role.dto';
import { JwtAuthGuard } from '@/modules/auth/jwt-auth.guard';
import { Roles } from '@/shared/decorators/roles.decorator';
import { Permissions } from '@/shared/decorators/permissions.decorator';
import { PermissionEnum, RoleEnum } from '@/shared/constants';
import { PermissionsGuard } from '@/shared/guards/permissions.guard';
import { SwaggerJwt } from '@/shared/decorators/swagger-jwt';

@Controller('roles')
export class RolesController {
  constructor(private readonly service: RolesService) {}

  @SwaggerJwt({
    apiTags: 'roles',
  })
  @Roles(RoleEnum.SuperAdmin, 'test')
  @Permissions(PermissionEnum.listRole)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Get('')
  list() {
    return this.service.list();
  }

  @SwaggerJwt({
    apiTags: 'roles',
  })
  @Roles(RoleEnum.SuperAdmin)
  @Permissions(PermissionEnum.createRole)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Post('')
  create(@Body() params: CreateRoleDto) {
    return this.service.create(params);
  }

  @SwaggerJwt({
    apiTags: 'roles',
  })
  @Roles(RoleEnum.SuperAdmin)
  @Permissions(PermissionEnum.updateRole)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() params: UpdateRoleDto) {
    return this.service.update(id, params);
  }

  @SwaggerJwt({
    apiTags: 'roles',
  })
  @Roles(RoleEnum.SuperAdmin)
  @Permissions(PermissionEnum.deleteRole)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.service.delete(id);
  }

  @SwaggerJwt({
    apiTags: 'roles',
  })
  @Get('authorized')
  @Roles(RoleEnum.SuperAdmin)
  @Permissions('view:authorized')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  authorized(): string {
    return 'This action is authorized for SuperAdmins only';
  }
}
