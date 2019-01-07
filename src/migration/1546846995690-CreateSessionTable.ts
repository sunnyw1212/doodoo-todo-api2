import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSessionTable1546846995690 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'CREATE TABLE IF NOT EXISTS `sessions` (`session_id` varchar(128) COLLATE utf8mb4_bin NOT NULL,`expires` int(11) unsigned NOT NULL,`data` text COLLATE utf8mb4_bin,PRIMARY KEY (`session_id`)) ENGINE=InnoDB',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('DROP TABLE `sessions`');
  }
}
