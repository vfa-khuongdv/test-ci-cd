/**
 * auth.service.ts
 * SPL_template
 * Created by khuongdv <khuongdv@vitalify.asia> on 3/17/23
 * Copyright (c) 2023 VFA Asia Co.,Ltd. All rights reserved.
 */
import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '@/modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@/entities/user.entity';
import { AuthResponse, JWTSignPayload } from '@/modules/auth/jwt.interface';
import { TokenService } from '@/modules/auth/token.service';
import { BrowserAgent } from '@/shared/types/browser.type';
import { RefreshTokenDto } from '@/modules/auth/dto/refresh-token.dto';
import { CryptService } from '@/shared/services/crypt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findUserByUsername(username);
    if (user && (await user.isEqualPassword(password))) {
      return user;
    }
    return null;
  }

  /**
   * Login with email and password
   *
   * @param user
   * @param browser
   */
  async login(user: User, browser: BrowserAgent): Promise<AuthResponse> {
    const payload: JWTSignPayload = {
      id: user.id,
      username: user.username,
      ipAddress: browser.ip,
    };
    const token = this.jwtService.sign(payload);
    const decoded = this.jwtService.decode(token, { json: true });
    const result = await this.tokenService.createToken(user, browser);
    return {
      AccessToken: {
        accessToken: token,
        expiredAt: decoded['exp'],
      },
      RefreshToken: {
        refreshToken: CryptService.encrypt(result.refreshToken),
        expiredAt: result.expiredAt,
      },
    };
  }

  /**
   * Update refresh token
   *
   * @param params
   * @param browser
   */
  async refreshToken(
    params: RefreshTokenDto,
    browser: BrowserAgent,
  ): Promise<AuthResponse> {
    let result = await this.tokenService.findRefreshToken(
      CryptService.decrypt(params.refreshToken),
    );

    if (!result) {
      throw new NotFoundException('not found token');
    }
    // New AccessToken
    const payload: JWTSignPayload = {
      id: result.user.id,
      username: result.user.username,
      ipAddress: browser.ip,
    };
    const accessToken = this.jwtService.sign(payload);
    const decoded = this.jwtService.decode(accessToken, { json: true });
    // Update RefreshToken
    result = await this.tokenService.updateRefreshToken(result);

    return {
      AccessToken: {
        accessToken: accessToken,
        expiredAt: decoded['exp'],
      },
      RefreshToken: {
        refreshToken: CryptService.encrypt(result.refreshToken),
        expiredAt: result.expiredAt,
      },
    };
  }
}
