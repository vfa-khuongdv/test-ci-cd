/**
 * user.service.ts
 * SPL_template
 * Created by khuongdv <khuongdv@vitalify.asia> on 3/17/23
 * Copyright (c) 2023 VFA Asia Co.,Ltd. All rights reserved.
 */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '@/repositories/user/user.repository';
import { User } from '@/entities/user.entity';
import { CreateUserDto } from '@/modules/users/dto/create-user.dto';
import { CreateResponse, UpdateResponse } from '@/shared/types';
import { RoleRepository } from '@/repositories/role/role.repository';
import { In } from 'typeorm';
import { ChangePasswordDto } from '@/modules/users/dto/change-password.dto';
import { BcryptService } from '@/shared/services/bcrypt.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepo: UserRepository,
    private readonly roleRepo: RoleRepository,
  ) {}

  /**
   * Find a user by id
   */
  public async findUserByUsername(username: string): Promise<User> {
    return this.usersRepo.findUserByUsername(username);
  }

  /**
   * Create a new user
   *
   * @param params
   */
  public async create(params: CreateUserDto): Promise<CreateResponse> {
    const user = new User();
    user.name = params.name;
    user.username = params.username;
    user.password = params.password;
    await this.usersRepo.save(user);
    return {
      success: true,
      message: 'User created successfully',
    };
  }

  /**
   * Show information user
   *
   * @param id
   */
  public async profile(id: number) {
    const userInfo = await this.usersRepo.findUserInfo(id);
    if (!userInfo) {
      throw new NotFoundException('Not found user');
    }
    return userInfo;
  }

  /**
   * Assign a role to a user
   *
   * @param userId
   * @param roleIds
   */
  public async updateRoles(
    userId: number,
    roleIds: number[],
  ): Promise<UpdateResponse> {
    const user = await this.usersRepo.findUserById(userId);
    if (!user) {
      throw new NotFoundException('Not found user');
    }
    let roles = [];
    if (roleIds.length) {
      roles = await this.roleRepo.find({
        where: {
          id: In(roleIds),
        },
      });
      if (!roles.length) {
        throw new NotFoundException('Not found role');
      }
    }
    user.roles = [...roles];
    await this.usersRepo.save(user);

    return {
      success: true,
      message: 'Roles assigned successfully',
    };
  }

  /**
   * Change the password of user
   *
   * @param userId
   * @param params
   */
  async changePassword(
    userId: number,
    params: ChangePasswordDto,
  ): Promise<UpdateResponse> {
    const user = await this.usersRepo.findUserById(userId);
    const isValidPassword = await user.isEqualPassword(params.password);
    // Show error when user does not exist or password is not correct
    if (!user || !isValidPassword) {
      throw new BadRequestException('Password is incorrect');
    }
    user.password = await BcryptService.hashPassword(params.newPassword);
    await this.usersRepo.update(userId, user);

    return {
      success: true,
      message: 'Password changed successfully',
    };
  }
}
