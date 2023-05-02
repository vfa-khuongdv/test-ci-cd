/**
 * crypt.service.ts
 * backend
 * Created by khuongdv <khuongdv@vitalify.asia> on 3/19/23
 * Copyright (c) 2023 VFA Asia Co.,Ltd. All rights reserved.
 */
import * as crypto from 'crypto';

export class CryptService {
  private static readonly algorithm = 'aes-256-cbc';
  private static readonly key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
  private static readonly iv = Buffer.from(process.env.ENCRYPTION_IV, 'hex');

  static encrypt(text: string): string {
    const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('hex');
  }

  static decrypt(text: string): string {
    const encryptedText = Buffer.from(text, 'hex');
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }
}
