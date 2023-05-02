/**
 * refresh-token.repository.ts
 * sos_backend
 * Created by khuongdv <khuongdv@vitalify.asia> on 3/9/23
 * Copyright (c) 2023 VFA Asia Co.,Ltd. All rights reserved.
 */
import { DataSource, Repository } from 'typeorm';
import { User } from '@/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { UserInterface } from '@/repositories/user/user.interface';

@Injectable()
export class UserRepository extends Repository<User> implements UserInterface {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  /**
   * Find user by id
   *
   * @param id
   */
  findUserById(id: number): Promise<User | undefined> {
    return this.findOne({ where: { id } });
  }

  /**
   * Find user by username
   *
   * @param username
   */
  findUserByUsername(username: string): Promise<User | undefined> {
    return this.findOne({ where: { username } });
  }

  /**
   * Find user info with roles and permissions
   *
   * @param id
   */
  findUserInfo(id: number) {
    return this.createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'roles')
      .leftJoinAndSelect('roles.permissions', 'permissions')
      .select([
        'user.id',
        'user.name',
        'user.username',
        'roles.id',
        'roles.name',
        'roles.displayName',
        'permissions.id',
        'permissions.key',
        'permissions.name',
      ])
      .where({ id: id })
      .getMany();
  }

  /**
   * Find role and permission by userId
   *
   * @param id
   */
  findRoleAndPermission(id: number) {
    return this.createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'roles')
      .leftJoinAndSelect('roles.permissions', 'permissions')
      .select([
        'user.id',
        'roles.id',
        'roles.name',
        'permissions.id',
        'permissions.key',
      ])
      .where({ id })
      .getOne();
  }
}
