/**
 * assign-role.dto.ts
 * backend
 * Created by khuongdv <khuongdv@vitalify.asia> on 3/19/23
 * Copyright (c) 2023 VFA Asia Co.,Ltd. All rights reserved.
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class AssignRoleDto {
  @ApiProperty({
    type: String,
    description: 'List roles to assign',
    example: [1, 2],
  })
  @IsNotEmpty()
  @IsNumber({}, { each: true })
  roleIds: number[];
}
