/**
 * roles.decorator.ts
 * backend
 * Created by khuongdv <khuongdv@vitalify.asia> on 3/19/23
 * Copyright (c) 2023 VFA Asia Co.,Ltd. All rights reserved.
 */
import { SetMetadata } from '@nestjs/common';
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
