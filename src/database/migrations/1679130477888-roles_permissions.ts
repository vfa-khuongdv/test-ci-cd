import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';
import { TABLE_NAME } from '@/shared/constants';

export class rolesPermissions1679130477888 implements MigrationInterface {
  public table = new Table({
    name: TABLE_NAME.ROLES_PERMISSIONS,
    columns: [
      {
        name: 'role_id',
        type: 'int',
      },
      {
        name: 'permission_id',
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
      TABLE_NAME.ROLES_PERMISSIONS,
      new TableForeignKey({
        columnNames: ['role_id'],
        referencedColumnNames: ['id'],
        referencedTableName: TABLE_NAME.ROLES,
        onDelete: 'NO ACTION',
      }),
    );
    await queryRunner.createForeignKey(
      TABLE_NAME.ROLES_PERMISSIONS,
      new TableForeignKey({
        columnNames: ['permission_id'],
        referencedColumnNames: ['id'],
        referencedTableName: TABLE_NAME.PERMISSIONS,
        onDelete: 'NO ACTION',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
