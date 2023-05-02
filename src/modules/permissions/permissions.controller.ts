import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PermissionsService } from '@/modules/permissions/permissions.service';
import { CreatePermissionDto } from '@/modules/permissions/dto/create-permission.dto';
import { UpdatePermissionDto } from '@/modules/permissions/dto/update-permission.dto';
import { JwtAuthGuard } from '@/modules/auth/jwt-auth.guard';
import { Roles } from '@/shared/decorators/roles.decorator';
import { Permissions } from '@/shared/decorators/permissions.decorator';
import { RoleEnum, PermissionEnum } from '@/shared/constants';
import { PermissionsGuard } from '@/shared/guards/permissions.guard';
import { SwaggerJwt } from '@/shared/decorators/swagger-jwt';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly service: PermissionsService) {}

  @SwaggerJwt({
    apiTags: 'permissions',
  })
  @Roles(RoleEnum.SuperAdmin)
  @Permissions(PermissionEnum.listPermission)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Get('')
  list() {
    return this.service.list();
  }

  @SwaggerJwt({
    apiTags: 'permissions',
  })
  @Roles(RoleEnum.SuperAdmin)
  @Permissions(PermissionEnum.createPermission)
  @UseGuards(JwtAuthGuard)
  @Post('')
  create(@Body() params: CreatePermissionDto) {
    return this.service.create(params);
  }

  @SwaggerJwt({
    apiTags: 'permissions',
  })
  @Roles(RoleEnum.SuperAdmin)
  @Permissions(PermissionEnum.updatePermission)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() params: UpdatePermissionDto) {
    return this.service.update(id, params);
  }

  @SwaggerJwt({
    apiTags: 'permissions',
  })
  @Roles(RoleEnum.SuperAdmin)
  @Permissions(PermissionEnum.deletePermission)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.service.delete(id);
  }
}
