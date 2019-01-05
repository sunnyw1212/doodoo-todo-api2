import { MigrationInterface, QueryRunner } from 'typeorm';

export class MoveTitleAndBodyDooDoo1546406548784 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'ALTER TABLE `doo_doo` CHANGE COLUMN `title` `title` VARCHAR(100) NOT NULL AFTER `id`',
    );
    await queryRunner.query(
      'ALTER TABLE `doo_doo` CHANGE COLUMN `body` `body` text NOT NULL AFTER `title`',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'ALTER TABLE `doo_doo` CHANGE COLUMN `title` `title` VARCHAR(255) NOT NULL AFTER `updated_at`',
    );
    await queryRunner.query(
      'ALTER TABLE `doo_doo` CHANGE COLUMN `body` `body` VARCHAR(255) NOT NULL AFTER `title`',
    );
  }
}
