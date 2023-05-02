import { Injectable, NotFoundException } from '@nestjs/common';
import { RoleRepository } from '@/repositories/role/role.repository';
import { CreateRoleDto } from '@/modules/roles/dto/create-role.dto';
import { Role } from '@/entities/role.entity';
import { CreateResponse, DeleteResponse, UpdateResponse } from '@/shared/types';
import { UpdateRoleDto } from '@/modules/roles/dto/update-role.dto';
import { PermissionRepository } from '@/repositories/permission/permission.repository';
import { In } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    private readonly roleRepo: RoleRepository,
    private readonly permissionRepo: PermissionRepository,
  ) {}

  /**
   * List all roles
   */
  async list() {
    return this.roleRepo.listRoles();
  }

  /**
   * Create a role
   * @param params
   */
  async create(params: CreateRoleDto): Promise<CreateResponse> {
    const role = new Role();
    role.name = params.name.trim();
    role.displayName = params.displayName;

    let permissions = [];
    if (params?.permissionIds.length) {
      permissions = await this.permissionRepo.find({
        where: {
          id: In(params.permissionIds),
        },
      });
    }
    role.permissions = [...permissions];

    await this.roleRepo.save(role);
    return {
      success: true,
      message: 'Create role successfully',
    };
  }

  async update(id: number, params: UpdateRoleDto): Promise<UpdateResponse> {
    const role = await this.roleRepo.findOne({
      where: { id },
    });
    if (!role) {
      throw new NotFoundException('Not found a role');
    }
    role.displayName = params.displayName;
    let permissions = [];
    if (params?.permissionIds.length) {
      permissions = await this.permissionRepo.find({
        where: {
          id: In(params.permissionIds),
        },
      });
    }
    role.permissions = [...permissions];

    await this.roleRepo.save(role);

    return {
      success: true,
      message: 'Update role successfully',
    };
  }

  /**
   * Delete a role
   *
   * @param id
   */
  async delete(id: number): Promise<DeleteResponse> {
    const role = await this.roleRepo.findOne({
      where: { id },
    });
    if (!role) {
      throw new NotFoundException('Not found a role');
    }
    await this.roleRepo.delete(id);
    return {
      success: true,
      message: 'Delete role successfully',
    };
  }
}
