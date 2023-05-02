import { MigrationInterface, QueryRunner } from 'typeorm';
import { RoleEnum } from '@/shared/constants';
import { Role } from '@/entities/role.entity';

export class masterRoles1679227441090 implements MigrationInterface {
  private roles = [
    {
      id: 1,
      name: RoleEnum.SuperAdmin,
      displayName: 'Super Admin',
    },
    {
      id: 2,
      name: RoleEnum.User,
      displayName: 'User',
    },
  ];

  private async insertData(queryRunner: QueryRunner) {
    const repo = queryRunner.connection.getRepository(Role);
    const items = this.roles.map((role) => {
      const item = new Role();
      item.id = role.id;
      item.name = role.name;
      item.displayName = role.displayName;
      return item;
    });
    return repo.save(items);
  }

  private async revertData(queryRunner: QueryRunner) {
    const repo = queryRunner.connection.getRepository(Role);
    const ids = this.roles.map((e) => e.id);
    return repo.delete(ids);
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.insertData(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await this.revertData(queryRunner);
  }
}
