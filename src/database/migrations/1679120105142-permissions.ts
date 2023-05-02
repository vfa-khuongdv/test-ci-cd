import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { TABLE_NAME } from '@/shared/constants';

export class permissions1679120105142 implements MigrationInterface {
  public table = new Table({
    name: TABLE_NAME.PERMISSIONS,
    columns: [
      {
        name: 'id',
        type: 'int',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'key',
        type: 'varchar',
        length: '255',
        isUnique: true,
      },
      {
        name: 'name',
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
