/**
 * create-resource.dto.ts
 * SPL_template
 * Created by khuongdv <khuongdv@vitalify.asia> on 3/18/23
 * Copyright (c) 2023 VFA Asia Co.,Ltd. All rights reserved.
 */
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePermissionDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty({
    type: String,
    description: 'Name of permission',
    example: 'Create user',
  })
  name: string;
}
