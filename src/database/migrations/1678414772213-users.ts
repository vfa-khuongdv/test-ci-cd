/**
 * users1678414772213.ts
 * SPL_template
 * Created by khuongdv <khuongdv@vitalify.asia> on 3/17/23
 * Copyright (c) 2023 VFA Asia Co.,Ltd. All rights reserved.
 */
import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { TABLE_NAME } from '@/shared/constants/table-name';

export class users1678414772213 implements MigrationInterface {
  public table = new Table({
    name: TABLE_NAME.USERS,
    columns: [
      {
        name: 'id',
        type: 'int',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'name',
        type: 'varchar',
        length: '45',
        isNullable: true,
      },
      {
        name: 'username',
        type: 'varchar',
        length: '45',
        isNullable: false,
        isUnique: true,
      },
      {
        name: 'password',
        type: 'varchar',
        length: '255',
        isNullable: false,
      },
      {
        name: 'created_at',
        type: 'timestamp',
        default: `CURRENT_TIMESTAMP`,
      },
      {
        name: 'updated_at',
        type: 'timestamp',
        default: `CURRENT_TIMESTAMP`,
      },
      {
        name: 'deleted_at',
        type: 'timestamp',
        isNullable: true,
        default: null,
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
