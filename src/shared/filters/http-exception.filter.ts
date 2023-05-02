/**
 * Http-exception.filter.ts
 * sos_backend
 * Created by khuongdv <khuongdv@vitalify.asia> on 3/9/23
 * Copyright (c) 2023 VFA Asia Co.,Ltd. All rights reserved.
 */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ValidationException } from '@/shared/exceptions/validator.exception';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  /**
   * Override for custom error handling
   *
   * @param exception
   * @param host
   */
  catch(exception: HttpException, host: ArgumentsHost): void {
    const now = Date.now();
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = {
      statusCode: status,
      error: this.formatErrorCode(exception),
      message: exception.message,
    };

    const log = {
      ApiName: ctx.getRequest().url,
      Request: JSON.stringify(ctx.getRequest().headers),
      Response: errorResponse,
      Elapsed: `${Date.now() - now} ms`,
      StatusCode: ctx.getResponse().statusCode,
    };
    this.writeResponse(log);
    response.status(status).json(errorResponse);
  }

  /**
   * Get error code from exception
   *
   * @protected
   */
  protected formatErrorCode(e: HttpException | ValidationException): string {
    if (e instanceof ValidationException) {
      return `INVALID_${e.getResponse()['error'].toUpperCase()}`;
    }
    return e.name.toUpperCase().replace('EXCEPTION', '');
  }

  /**
   * Write log for response error
   *
   * @param log
   * @private
   */
  private writeResponse(log) {
    this.logger.log(JSON.stringify(log));
  }
}
