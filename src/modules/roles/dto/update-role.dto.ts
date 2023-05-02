/**
 * create-resource.dto.ts
 * SPL_template
 * Created by khuongdv <khuongdv@vitalify.asia> on 3/18/23
 * Copyright (c) 2023 VFA Asia Co.,Ltd. All rights reserved.
 */
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty({
    type: String,
    description: 'Display name of the role',
    example: 'Administrator',
  })
  displayName: string;

  @ApiProperty({
    type: String,
    description: 'List permissions',
    example: [1, 2],
  })
  @IsOptional()
  @IsNumber({}, { each: true })
  permissionIds: number[];
}
