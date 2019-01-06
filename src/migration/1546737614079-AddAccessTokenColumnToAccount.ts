import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAccessTokenColumnToAccount1546737614079 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'ALTER TABLE `account` ADD `access_token` varchar(50) NOT NULL AFTER `password_hash`',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `account` DROP COLUMN `access_token`');
  }
}
