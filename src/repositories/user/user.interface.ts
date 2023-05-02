/**
 * refresh-token.interface.ts
 * nestjs-backend
 * Created by khuongdv <khuongdv@vitalify.asia> on 3/14/23
 * Copyright (c) 2023 VFA Asia Co.,Ltd. All rights reserved.
 */
export interface UserInterface {
  findUserById(id: number);
  findUserByUsername(username: string);
  findUserInfo(id: number);
  findRoleAndPermission(id: number);
}
