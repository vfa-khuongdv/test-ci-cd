/**
 * permission.repository.ts
 * SPL_template
 * Created by khuongdv <khuongdv@vitalify.asia> on 3/18/23
 * Copyright (c) 2023 VFA Asia Co.,Ltd. All rights reserved.
 */
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Permission } from '@/entities/permission.entity';
import { PermissionInterface } from '@/repositories/permission/permission.interface';

@Injectable()
export class PermissionRepository
  extends Repository<Permission>
  implements PermissionInterface
{
  constructor(private dataSource: DataSource) {
    super(Permission, dataSource.createEntityManager());
  }

  /**
   * Get all permissions.
   */
  listPermissions() {
    return this.find({
      select: ['id', 'key', 'name', 'createdAt', 'updatedAt'],
      order: { id: 'DESC' },
    });
  }
}
