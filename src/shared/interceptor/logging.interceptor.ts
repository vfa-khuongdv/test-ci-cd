/**
 * logging.interceptor.ts
 * sos_backend
 * Created by khuongdv <khuongdv@vitalify.asia> on 3/9/23
 * Copyright (c) 2023 VFA Asia Co.,Ltd. All rights reserved.
 */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private logger = new Logger('API');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    return next.handle().pipe(
      map((data) => {
        const sw = context.switchToHttp();
        const log = {
          ApiName: sw.getRequest().url,
          Request: JSON.stringify(sw.getRequest().headers),
          Response: JSON.stringify(data),
          Elapsed: `${Date.now() - now} ms`,
          StatusCode: sw.getResponse().statusCode,
        };
        this.logger.log(JSON.stringify(log));
        return data;
      }),
    );
  }
}
