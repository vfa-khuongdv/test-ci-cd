/**
 * bcrypt.service.ts
 * SPL_template
 * Created by khuongdv <khuongdv@vitalify.asia> on 3/17/23
 * Copyright (c) 2023 VFA Asia Co.,Ltd. All rights reserved.
 */

import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  private static readonly saltRounds = 10;
  private static readonly secretKey = process.env.BCRYPT_SECRET_KEY;

  /**
   * Hash password using bcrypt
   *
   * @param plaintextPassword
   */
  public static async hashPassword(plaintextPassword: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return bcrypt.hash(plaintextPassword + this.secretKey, salt);
  }

  /**
   * compare password using bcrypt
   *
   * @param plaintextPassword
   * @param hashedPassword
   */
  public static async comparePassword(
    plaintextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plaintextPassword + this.secretKey, hashedPassword);
  }

  /**
   * Random string generator
   *
   * @param saltLength
   */
  public static generate(saltLength = 100): string {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < saltLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
