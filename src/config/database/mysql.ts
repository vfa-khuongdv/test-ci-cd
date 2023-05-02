/**
 * mysql.ts
 * SPL_template
 * Created by khuongdv <khuongdv@vitalify.asia> on 3/17/23
 * Copyright (c) 2023 VFA Asia Co.,Ltd. All rights reserved.
 */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';

export default {
  type: process.env.DB_TYPE,
  replication: {
    master: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    },
    slaves: [
      {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
      },
    ],
  },
  entities: [path.join(__dirname, '../..', '/**/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, '../..', 'database/migrations/*{.ts,.js}')],
  cli: {
    migrationsDir: path.join(__dirname, '../..', 'database/migrations'),
  },
  migrationsTableName: 'migrations',
  migrationsRun: false,
  logging: true,
  synchronize: false,
} as TypeOrmModuleOptions;
