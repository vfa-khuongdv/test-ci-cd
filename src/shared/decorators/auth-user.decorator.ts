/**
 * auth-user.decorator.ts
 * backend
 * Created by khuongdv <khuongdv@vitalify.asia> on 3/19/23
 * Copyright (c) 2023 VFA Asia Co.,Ltd. All rights reserved.
 */

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { User } from '@/entities/user.entity';

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest<Request>();
    return <User>req.user;
  },
);
