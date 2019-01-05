import { MigrationInterface, QueryRunner } from 'typeorm';

export class MoveTitleColumnInDooDoo1546394909566 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'ALTER TABLE `doo_doo` CHANGE COLUMN `title` `title` VARCHAR(255) NOT NULL AFTER `id`',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'ALTER TABLE `doo_doo` CHANGE COLUMN `title` `title` VARCHAR(255) NOT NULL AFTER `updated_at`',
    );
  }
}
