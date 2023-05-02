/**
 * permission-enum.ts
 * backend
 * Created by khuongdv <khuongdv@vitalify.asia> on 3/19/23
 * Copyright (c) 2023 VFA Asia Co.,Ltd. All rights reserved.
 */
export enum PermissionEnum {
  'listRole' = 'list:role',
  'createRole' = 'create:role',
  'updateRole' = 'update:role',
  'deleteRole' = 'delete:role',
  'assignedRole' = 'assigned:role',
  'listPermission' = 'list:permission',
  'createPermission' = 'create:permission',
  'updatePermission' = 'update:permission',
  'deletePermission' = 'delete:permission',
}
