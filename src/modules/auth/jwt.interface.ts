/**
 * jwt.interface.ts
 * SPL_template
 * Created by khuongdv <khuongdv@vitalify.asia> on 3/16/23
 * Copyright (c) 2023 VFA Asia Co.,Ltd. All rights reserved.
 */
export type JWTPayload = {
  id: number;
  username: string;
  ipAddress: string;
  iat: number;
  exp: number;
};

export type JWTSignPayload = Omit<JWTPayload, 'iat' | 'exp'>;

export type AuthResponse = {
  AccessToken: {
    accessToken: string;
    expiredAt: number;
  };
  RefreshToken: {
    refreshToken: string;
    expiredAt: number;
  };
};
