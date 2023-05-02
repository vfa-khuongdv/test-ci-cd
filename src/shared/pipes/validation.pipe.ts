/**
 * validation.pipe.ts
 * SPL_template
 * Created by khuongdv <khuongdv@vitalify.asia> on 3/16/23
 * Copyright (c) 2023 VFA Asia Co.,Ltd. All rights reserved.
 */
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ValidationException } from '@/shared/exceptions/validator.exception';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata): Promise<any> {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      const { message, field } = this.getMessage(errors);
      throw new ValidationException(message, field);
    }
    return value;
  }

  /**
   * To validate
   *
   * @param metatype
   * @private
   */
  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  /**
   * Get field and message for validate exception
   *
   * @private
   */
  private getMessage(errors: ValidationError[]) {
    const firstError = errors[0];
    const field = firstError.property;
    const message = Object.values(firstError.constraints)[0];
    return {
      message: message,
      field: field,
    };
  }
}
