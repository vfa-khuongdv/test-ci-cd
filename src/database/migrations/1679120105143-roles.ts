import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { TABLE_NAME } from '@/shared/constants';

export class roles1679120105143 implements MigrationInterface {
  public table = new Table({
    name: TABLE_NAME.ROLES,
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
        length: '255',
        isUnique: true,
      },
      {
        name: 'display_name',
        type: 'varchar',
        length: '255',
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
