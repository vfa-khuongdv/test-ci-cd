/**
 * auth.controller.ts
 * SPL_template
 * Created by khuongdv <khuongdv@vitalify.asia> on 3/17/23
 * Copyright (c) 2023 VFA Asia Co.,Ltd. All rights reserved.
 */
import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from '@/modules/auth/local-auth.guard';
import { AuthService } from '@/modules/auth/auth.service';
import { CredentialsDto } from '@/modules/auth/dto/credentials.dto';
import { Browser } from '@/shared/decorators/browser.decorator';
import { BrowserAgent } from '@/shared/types/browser.type';
import { RefreshTokenDto } from '@/modules/auth/dto/refresh-token.dto';
import { SwaggerJwt } from '@/shared/decorators/swagger-jwt';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SwaggerJwt({
    apiTags: 'auth',
    authorization: false,
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req,
    @Body() params: CredentialsDto,
    @Browser() browser: BrowserAgent,
  ) {
    return this.authService.login(req.user, browser);
  }

  @SwaggerJwt({
    apiTags: 'auth',
    authorization: false,
  })
  @Post('refresh')
  async refresh(
    @Body() params: RefreshTokenDto,
    @Browser() browser: BrowserAgent,
  ) {
    return this.authService.refreshToken(params, browser);
  }
}
