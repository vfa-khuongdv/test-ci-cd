/**
 * transform.interceptor.ts
 * backend
 * Created by khuongdv <khuongdv@vitalify.asia> on 3/22/23
 * Copyright (c) 2023 VFA Asia Co.,Ltd. All rights reserved.
 */

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  result: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(map((result) => ({ result })));
  }
}
