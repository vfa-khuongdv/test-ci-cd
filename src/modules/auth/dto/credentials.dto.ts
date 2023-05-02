/**
 * credentials.dto.ts
 * SPL_template
 * Created by khuongdv <khuongdv@vitalify.asia> on 3/16/23
 * Copyright (c) 2023 VFA Asia Co.,Ltd. All rights reserved.
 */
/**
 * create-user.dto.ts
 * backend
 * Created by khuongdv <khuongdv@vitalify.asia> on 3/16/23
 * Copyright (c) 2023 VFA Asia Co.,Ltd. All rights reserved.
 */
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CredentialsDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  @ApiProperty({
    type: String,
    description: 'Username',
    example: 'john',
  })
  username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Password',
    example: '12345678',
  })
  password: string;
}
