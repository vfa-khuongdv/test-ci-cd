/**
 * token.service.ts
 * SPL_template
 * Created by <khuongdv@vitalify.asia> on 3/17/23
 * Copyright (c) 2023 VFA Asia Co.,Ltd. All rights reserved.
 */
import { Injectable } from '@nestjs/common';
import { RefreshTokenRepository } from '@/repositories/refresh-token/refresh-token.repository';
import { RefreshToken } from '@/entities/refresh-token.entity';
import * as moment from 'moment';
import { User } from '@/entities/user.entity';
import { BcryptService } from '@/shared/services/bcrypt.service';
import { BrowserAgent } from '@/shared/types/browser.type';

@Injectable()
export class TokenService {
  constructor(private readonly refreshTokenRepo: RefreshTokenRepository) {}

  /**
   * Create a new token for refresh token
   */
  public async createToken(
    user: User,
    agent: BrowserAgent,
  ): Promise<RefreshToken> {
    const refresh = new RefreshToken();
    refresh.refreshToken = BcryptService.generate();
    refresh.expiredAt = this.getTokenExpiredTime();
    refresh.ipAddress = agent.ip;
    refresh.user = user;
    return this.refreshTokenRepo.save(refresh);
  }

  /**
   * Get token from database
   *
   * @param token
   */
  public async findRefreshToken(
    token: string,
  ): Promise<RefreshToken | undefined> {
    return this.refreshTokenRepo.findRefreshToken(token);
  }

  /**
   * Update token
   *
   * @param refresh
   */
  public async updateRefreshToken(
    refresh: RefreshToken,
  ): Promise<RefreshToken> {
    refresh.usedCount += 1;
    refresh.refreshToken = BcryptService.generate();
    refresh.expiredAt = this.getTokenExpiredTime();
    return this.refreshTokenRepo.save(refresh);
  }

  /**
   * Get refresh token expired time
   *
   * @private
   */
  private getTokenExpiredTime() {
    return moment().add(30, 'days').unix();
  }
}
