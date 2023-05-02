/**
 * refresh-token.interface.ts
 * nestjs-backend
 * Created by khuongdv <khuongdv@vitalify.asia> on 3/14/23
 * Copyright (c) 2023 VFA Asia Co.,Ltd. All rights reserved.
 */
import { RefreshToken } from '@/entities/refresh-token.entity';

export interface RefreshTokenInterface {
  findRefreshToken(token: string): Promise<RefreshToken>;
}
