import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterPasswordHashLengthTo100Account1546414678690 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `account` DROP COLUMN `password_hash`");
        await queryRunner.query("ALTER TABLE `account` ADD `password_hash` varchar(100) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `account` DROP COLUMN `password_hash`");
        await queryRunner.query("ALTER TABLE `account` ADD `password_hash` varchar(50) NOT NULL");
    }

}
