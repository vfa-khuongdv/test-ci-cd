import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';
import { TABLE_NAME } from '@/shared/constants';

export class usersRoles1679209713261 implements MigrationInterface {
  public table = new Table({
    name: TABLE_NAME.USERS_ROLES,
    columns: [
      {
        name: 'user_id',
        type: 'int',
      },
      {
        name: 'role_id',
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
      TABLE_NAME.USERS_ROLES,
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: TABLE_NAME.USERS,
        onDelete: 'NO ACTION',
      }),
    );
    await queryRunner.createForeignKey(
      TABLE_NAME.USERS_ROLES,
      new TableForeignKey({
        columnNames: ['role_id'],
        referencedColumnNames: ['id'],
        referencedTableName: TABLE_NAME.ROLES,
        onDelete: 'NO ACTION',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
