/**
 * browser.decorator.ts
 * SPL_template
 * Created by khuongdv <khuongdv@vitalify.asia> on 3/17/23
 * Copyright (c) 2023 VFA Asia Co.,Ltd. All rights reserved.
 */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const Browser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();
    return {
      ip: request.ip,
      userAgent: request.headers['user-agent'],
    };
  },
);
