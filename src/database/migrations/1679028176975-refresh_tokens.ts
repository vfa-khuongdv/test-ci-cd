/**
 * tokens1679028176975.ts
 * SPL_template
 * Created by khuongdv <khuongdv@vitalify.asia> on 3/17/23
 * Copyright (c) 2023 VFA Asia Co.,Ltd. All rights reserved.
 */
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';
import { TABLE_NAME } from '@/shared/constants';

export class refreshTokens1679028176975 implements MigrationInterface {
  public table = new Table({
    name: TABLE_NAME.REFRESH_TOKENS,
    columns: [
      {
        name: 'id',
        type: 'int',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'refresh_token',
        type: 'varchar',
        length: '255',
      },
      {
        name: 'ip_address',
        type: 'varchar',
        length: '50',
      },
      {
        name: 'used_count',
        type: 'int',
        width: 11,
        default: 0,
      },
      {
        name: 'expired_at',
        type: 'int',
        width: 11,
        isNullable: false,
      },
      {
        name: 'users_id',
        type: 'int',
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
    await queryRunner.createForeignKey(
      TABLE_NAME.REFRESH_TOKENS,
      new TableForeignKey({
        columnNames: ['users_id'],
        referencedColumnNames: ['id'],
        referencedTableName: TABLE_NAME.USERS,
        onDelete: 'NO ACTION',
      }),
    );
    await queryRunner.createIndex(
      TABLE_NAME.REFRESH_TOKENS,
      new TableIndex({
        columnNames: ['refresh_token'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
