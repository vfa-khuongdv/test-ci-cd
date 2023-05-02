/**
 * swagger-jwt.ts
 * backend
 * Created by khuongdv <khuongdv@vitalify.asia> on 3/20/23
 * Copyright (c) 2023 VFA Asia Co.,Ltd. All rights reserved.
 */
import {
  ApiBearerAuth,
  ApiHeader,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

type SwaggerJwtProps = {
  apiTags?: string;
  authorization?: boolean;
};

export function SwaggerJwt({
  apiTags = '',
  authorization = true,
}: SwaggerJwtProps) {
  const emptyDecorator = () => null;
  return applyDecorators(
    ApiTags(apiTags),
    ApiBearerAuth(),
    authorization
      ? ApiUnauthorizedResponse({
          description: 'Unauthorized',
        })
      : emptyDecorator,
    ApiHeader({
      name: 'x-api-key',
      description: 'API key for security',
    }),
  );
}
