/**
 * auth.module.ts
 * SPL_template
 * Created by khuongdv <khuongdv@vitalify.asia> on 3/17/23
 * Copyright (c) 2023 VFA Asia Co.,Ltd. All rights reserved.
 */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '@/modules/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '@/modules/auth/local.strategy';
import { AuthController } from './auth.controller';
import { jwtConstants } from '@/modules/auth/constants';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '@/modules/auth/jwt.strategy';
import { TokenService } from '@/modules/auth/token.service';
import { RefreshTokenRepository } from '@/repositories/refresh-token/refresh-token.repository';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    AuthService,
    TokenService,
    LocalStrategy,
    JwtStrategy,
    RefreshTokenRepository,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
