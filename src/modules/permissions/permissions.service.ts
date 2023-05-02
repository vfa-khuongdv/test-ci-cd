import { Injectable, NotFoundException } from '@nestjs/common';
import { PermissionRepository } from '@/repositories/permission/permission.repository';
import { CreatePermissionDto } from '@/modules/permissions/dto/create-permission.dto';
import { CreateResponse, DeleteResponse, UpdateResponse } from '@/shared/types';
import { Permission } from '@/entities/permission.entity';
import { UpdatePermissionDto } from '@/modules/permissions/dto/update-permission.dto';

@Injectable()
export class PermissionsService {
  constructor(private readonly permissionRepo: PermissionRepository) {}

  /**
   * Find list of permission
   */
  async list() {
    return this.permissionRepo.listPermissions();
  }

  /**
   * Create a new permission
   *
   * @param params
   */
  async create(params: CreatePermissionDto): Promise<CreateResponse> {
    const permission = new Permission();
    permission.key = params.key.toLowerCase();
    permission.name = params.name;
    await this.permissionRepo.insert(permission);

    return {
      success: true,
      message: 'Create permission successfully',
    };
  }

  /**
   * Update a permission
   *
   * @param id
   * @param params
   */
  async update(
    id: number,
    params: UpdatePermissionDto,
  ): Promise<UpdateResponse> {
    const permission = await this.permissionRepo.findOne({
      where: { id },
    });
    if (!permission) {
      throw new NotFoundException('Not found permission');
    }
    permission.name = params.name;
    await this.permissionRepo.update(id, permission);

    return {
      success: true,
      message: 'Update permission successfully',
    };
  }

  /**
   * Delete a permission
   *
   * @param id
   */
  async delete(id: number): Promise<DeleteResponse> {
    const permission = await this.permissionRepo.findOne({
      where: { id },
    });
    if (!permission) {
      throw new NotFoundException('Not found permission');
    }
    await this.permissionRepo.delete(id);

    return {
      success: true,
      message: 'Delete permission successfully',
    };
  }
}
