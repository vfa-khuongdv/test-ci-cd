import { In, MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '@/entities/user.entity';
import { Role } from '@/entities/role.entity';

export class masterUsers1679235594489 implements MigrationInterface {
  private users = [
    {
      name: 'john',
      username: 'john',
      password: 12345678,
      roles: [1], // Role: Super Admin
    },
  ];

  private async insertData(queryRunner: QueryRunner) {
    const userRepo = queryRunner.connection.getRepository(User);
    const roleRepo = queryRunner.connection.getRepository(Role);

    for (const user of this.users) {
      const item = new User();
      item.name = user.name;
      item.username = user.username;
      item.password = user.password.toString();
      item.roles = await roleRepo.find({
        where: {
          id: In(user.roles),
        },
      });
      await userRepo.save(item);
    }
  }

  private async revertData(queryRunner: QueryRunner) {
    const userRepo = queryRunner.connection.getRepository(User);
    const users = await userRepo.find({
      where: {
        username: In(this.users.map((user) => user.username)),
      },
    });

    for (const user of users) {
      user.roles = [];
      await userRepo.save(user);
    }
    const ids = users.map((user) => user.id);
    await userRepo.delete(ids);
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.insertData(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await this.revertData(queryRunner);
  }
}
