/**
 * create-user.dto.ts
 * backend
 * Created by khuongdv <khuongdv@vitalify.asia> on 3/16/23
 * Copyright (c) 2023 VFA Asia Co.,Ltd. All rights reserved.
 */
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(55)
  @ApiProperty({
    type: String,
    description: 'Name',
    example: 'John Doe',
  })
  name: string;

  @IsString()
  @MaxLength(55)
  @ApiProperty({
    type: String,
    description: 'Username',
    example: 'john',
  })
  username: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @ApiProperty({
    type: String,
    description: 'Password',
    example: '12345678',
  })
  password: string;
}
