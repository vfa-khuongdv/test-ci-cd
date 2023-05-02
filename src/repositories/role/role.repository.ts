/**
 * role.repository.ts
 * SPL_template
 * Created by khuongdv <khuongdv@vitalify.asia> on 3/18/23
 * Copyright (c) 2023 VFA Asia Co.,Ltd. All rights reserved.
 */
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { RoleInterface } from '@/repositories/role/role.interface';
import { Role } from '@/entities/role.entity';

@Injectable()
export class RoleRepository extends Repository<Role> implements RoleInterface {
  constructor(private dataSource: DataSource) {
    super(Role, dataSource.createEntityManager());
  }

  listRoles() {
    return this.createQueryBuilder('role')
      .select([
        'role.id',
        'role.name',
        'role.displayName',
        'role.createdAt',
        'role.updatedAt',
      ])
      .leftJoin('role.permissions', 'p')
      .addSelect(['p.id', 'p.key', 'p.name'])
      .getMany();
  }
}
