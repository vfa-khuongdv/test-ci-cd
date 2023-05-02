/**
 * resource.ts
 * SPL_template
 * Created by khuongdv <khuongdv@vitalify.asia> on 3/18/23
 * Copyright (c) 2023 VFA Asia Co.,Ltd. All rights reserved.
 */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TABLE_NAME } from '@/shared/constants';
import { Base } from '@/entities/base.entity';

@Entity({
  name: TABLE_NAME.PERMISSIONS,
})
export class Permission extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  key: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  name: string;
}
