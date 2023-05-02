/**
 * refresh-token.entity.ts
 * SPL_template
 * Created by khuongdv <khuongdv@vitalify.asia> on 3/17/23
 * Copyright (c) 2023 VFA Asia Co.,Ltd. All rights reserved.
 */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Base } from './base.entity';
import { TABLE_NAME } from '@/shared/constants/table-name';
import { User } from '@/entities/user.entity';

@Entity({
  name: TABLE_NAME.REFRESH_TOKENS,
})
export class RefreshToken extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'ip_address',
  })
  ipAddress: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'refresh_token',
  })
  refreshToken: string;

  @Column({
    type: 'int',
    name: 'used_count',
    default: 0,
  })
  usedCount: string;

  @Column({
    type: 'int',
    name: 'expired_at',
  })
  expiredAt: number;

  @ManyToOne(() => User, (user) => user.refreshTokens)
  @JoinColumn({
    name: 'users_id',
  })
  user: User;
}
