import { MigrationInterface, QueryRunner } from 'typeorm';
import { PermissionEnum } from '@/shared/constants';
import { Permission } from '@/entities/permission.entity';

export class masterPermissions1679226648722 implements MigrationInterface {
  private permissions = [
    {
      id: 1,
      key: PermissionEnum.listRole,
      name: 'List role',
    },
    {
      id: 2,
      key: PermissionEnum.createRole,
      name: 'Create role',
    },
    {
      id: 3,
      key: PermissionEnum.updateRole,
      name: 'Update role',
    },
    {
      id: 4,
      key: PermissionEnum.deleteRole,
      name: 'Delete role',
    },
    {
      id: 5,
      key: PermissionEnum.assignedRole,
      name: 'Assigned role',
    },
    {
      id: 6,
      key: PermissionEnum.listPermission,
      name: 'List permissions',
    },
    {
      id: 7,
      key: PermissionEnum.createPermission,
      name: 'Create permission',
    },
    {
      id: 8,
      key: PermissionEnum.updatePermission,
      name: 'Update permission',
    },
    {
      id: 9,
      key: PermissionEnum.deletePermission,
      name: 'Delete permission',
    },
  ];

  private async insertData(queryRunner: QueryRunner) {
    const repo = queryRunner.connection.getRepository(Permission);
    const items = this.permissions.map((per) => {
      const item = new Permission();
      item.id = per.id;
      item.key = per.key;
      item.name = per.name;
      return item;
    });
    return repo.save(items);
  }

  private revertData(queryRunner: QueryRunner) {
    const repo = queryRunner.connection.getRepository(Permission);
    const ids = this.permissions.map((per) => per.id);
    return repo.delete(ids);
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.insertData(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await this.revertData(queryRunner);
  }
}
