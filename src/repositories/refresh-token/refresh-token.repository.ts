/**
 * refresh-token.repository.ts
 * sos_backend
 * Created by khuongdv <khuongdv@vitalify.asia> on 3/9/23
 * Copyright (c) 2023 VFA Asia Co.,Ltd. All rights reserved.
 */
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { RefreshTokenInterface } from '@/repositories/refresh-token/refresh-token.interface';
import { RefreshToken } from '@/entities/refresh-token.entity';

@Injectable()
export class RefreshTokenRepository
  extends Repository<RefreshToken>
  implements RefreshTokenInterface
{
  constructor(private dataSource: DataSource) {
    super(RefreshToken, dataSource.createEntityManager());
  }

  /**
   * Find token by refreshToken
   *
   * @param refreshToken
   */
  findRefreshToken(refreshToken: string): Promise<RefreshToken> {
    return this.findOne({
      where: {
        refreshToken,
      },
      relations: ['user'],
    });
  }
}
