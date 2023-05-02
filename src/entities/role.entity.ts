/**
 * role.entity.ts
 * SPL_template
 * Created by khuongdv <khuongdv@vitalify.asia> on 3/18/23
 * Copyright (c) 2023 VFA Asia Co.,Ltd. All rights reserved.
 */
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TABLE_NAME } from '@/shared/constants';
import { Base } from '@/entities/base.entity';
import { Permission } from '@/entities/permission.entity';

@Entity({
  name: TABLE_NAME.ROLES,
})
export class Role extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'display_name',
  })
  displayName: string;

  @ManyToMany(() => Permission, {
    cascade: true,
  })
  @JoinTable({
    name: 'roles_permissions',
    joinColumn: { name: 'role_id' },
    inverseJoinColumn: { name: 'permission_id' },
  })
  permissions: Permission[];
}
