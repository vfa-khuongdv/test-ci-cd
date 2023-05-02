/**
 * jwt.strategy.ts
 * SPL_template
 * Created by khuongdv <khuongdv@vitalify.asia> on 3/16/23
 * Copyright (c) 2023 VFA Asia Co.,Ltd. All rights reserved.
 */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { JWTPayload, JWTSignPayload } from '@/modules/auth/jwt.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  /**
   * Validate jwt strategy
   *
   * @param payload
   */
  async validate(payload: JWTPayload): Promise<JWTSignPayload> {
    return {
      id: payload.id,
      username: payload.username,
      ipAddress: payload.ipAddress,
    };
  }
}
