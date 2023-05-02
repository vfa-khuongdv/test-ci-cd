/**
 * user.entity.ts
 * sos_backend
 * Created by khuongdv <khuongdv@vitalify.asia> on 3/9/23
 * Copyright (c) 2023 VFA Asia Co.,Ltd. All rights reserved.
 */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Base } from './base.entity';
import { TABLE_NAME } from '@/shared/constants/table-name';
import { BcryptService } from '@/shared/services/bcrypt.service';
import { RefreshToken } from '@/entities/refresh-token.entity';
import { Role } from '@/entities/role.entity';

@Entity({
  name: TABLE_NAME.USERS,
})
export class User extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 45,
    nullable: true,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 45,
    name: 'username',
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'password',
  })
  password: string;

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshToken[];

  /**
   * Encrypt password before saving to database
   */
  @BeforeInsert()
  public async hashPassword(): Promise<void> {
    this.password = await BcryptService.hashPassword(this.password);
  }

  /**
   * Check plain password is equal with hashed password
   *
   * @param password
   */
  public async isEqualPassword(password: string): Promise<boolean> {
    return BcryptService.comparePassword(password, this.password);
  }

  @ManyToMany(() => Role, {
    cascade: true,
  })
  @JoinTable({
    name: 'users_roles',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'role_id' },
  })
  roles: Role[];
}
